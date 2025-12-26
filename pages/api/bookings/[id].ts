import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { Booking } from '@/lib/types';
import { mockProperties } from '@/lib/mockData';
import { calculateNights, calculateTotalPrice } from '@/lib/utils';

// Shared in-memory storage - in production, use a database
// Note: This is a simple approach. In production, use a proper database.
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

  const { id } = req.query;

  if (req.method === 'GET') {
    const booking = global.bookings!.find(b => b.id === id);
    
    // For demo, create a mock booking if none exists
    if (!booking && id) {
      const property = mockProperties[0];
      const room = property.rooms[0];
      const checkIn = '2022-12-09';
      const checkOut = '2022-12-12';
      const nights = calculateNights(checkIn, checkOut);
      const totalPrice = calculateTotalPrice(room.price, nights, 40, 20);
      
      const mockBooking: Booking = {
        id: id as string,
        propertyId: property.id,
        propertyName: property.name,
        roomId: room.id,
        roomName: room.name,
        checkIn,
        checkOut,
        guests: 2,
        totalPrice,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        userEmail: session.user?.email || 'demo@example.com',
      };
      global.bookings!.push(mockBooking);
      return res.status(200).json(mockBooking);
    }

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if booking belongs to user (allow if email matches or if no email set for demo)
    const sessionEmail = session.user?.email?.toLowerCase();
    const bookingEmail = booking.userEmail?.toLowerCase();
    
    if (bookingEmail && sessionEmail && bookingEmail !== sessionEmail) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.status(200).json(booking);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

