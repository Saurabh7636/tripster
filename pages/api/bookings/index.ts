import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { Booking } from '@/lib/types';
import { mockProperties } from '@/lib/mockData';
import { calculateNights, calculateTotalPrice } from '@/lib/utils';

// Shared in-memory storage - in production, use a database
declare global {
  // eslint-disable-next-line no-var
  var bookings: Booking[] | undefined;
}

if (!global.bookings) {
  global.bookings = [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { propertyId, roomId, checkIn, checkOut, guests, email } = req.body;

    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const room = property.rooms.find(r => r.id === roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const nights = calculateNights(checkIn, checkOut);
    const totalPrice = calculateTotalPrice(room.price, nights, 40, 20);

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      propertyId,
      propertyName: property.name,
      roomId,
      roomName: room.name,
      checkIn,
      checkOut,
      guests: guests || 2,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      userEmail: session.user?.email || email || '',
    };

    global.bookings!.push(booking);

    return res.status(201).json(booking);
  }

  if (req.method === 'GET') {
    const userBookings = global.bookings!.filter(
      b => b.userEmail === session.user?.email
    );
    return res.status(200).json(userBookings);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

