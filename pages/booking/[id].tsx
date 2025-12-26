import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import { mockProperties } from '@/lib/mockData';
import { Property, Room } from '@/lib/types';

export default function BookingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id, roomId, checkIn, checkOut, guests } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    const prop = mockProperties.find(p => p.id === id);
    if (prop) {
      setProperty(prop);
      const room = prop.rooms.find(r => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
      }
    }
  }, [id, roomId, session, router]);

  const handleBookingComplete = async (bookingData: any) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const booking = await response.json();
        router.push(`/booking/confirmation/${booking.id}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  // Set default dates if not provided
  const defaultCheckIn = checkIn as string || new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckOut = checkOut as string || tomorrow.toISOString().split('T')[0];

  if (!router.isReady) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!property || !selectedRoom) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Property or room not found.</p>
        <button
          onClick={() => router.push('/search')}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Booking process</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookingForm
            property={property}
            selectedRoom={selectedRoom}
            checkIn={defaultCheckIn}
            checkOut={defaultCheckOut}
            guests={guests ? parseInt(guests as string) : 2}
            onBookingComplete={handleBookingComplete}
          />
        </div>
        <div className="lg:col-span-1">
          <BookingSummary
            property={property}
            room={selectedRoom}
            checkIn={defaultCheckIn}
            checkOut={defaultCheckOut}
            guests={guests ? parseInt(guests as string) : 2}
          />
        </div>
      </div>
    </div>
  );
}

