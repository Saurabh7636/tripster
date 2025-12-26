import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Booking, Property } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function BookingConfirmationPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    if (!id) {
      setError('Booking ID is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`/api/bookings/${id}`).then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch booking');
        }
        return res.json();
      }),
      fetch('/api/properties').then(res => res.json())
    ])
      .then(([bookingData, properties]) => {
        setBooking(bookingData);
        const prop = properties.find((p: Property) => p.id === bookingData.propertyId);
        setProperty(prop);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
        setLoading(false);
      });
  }, [id, session, router]);

  if (!router.isReady || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => router.push('/search')}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          Back to Search
        </button>
      </div>
    );
  }

  if (!booking || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">Booking not found</p>
        <button
          onClick={() => router.push('/search')}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {property.name} {'*'.repeat(property.starRating)}
          </h2>
          <p className="text-gray-600 mb-4">{property.description}</p>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Check-in:</span> {formatDate(booking.checkIn)}
            </div>
            <div>
              <span className="font-semibold">Check-out:</span> {formatDate(booking.checkOut)}
            </div>
            <div>
              <span className="font-semibold">Room:</span> {booking.roomName}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-4xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your booking is now confirmed!</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Your trip starts {formatDate(booking.checkIn)}
        </h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center space-x-2">
            <span>📅</span>
            <span>Check-in: {formatDate(booking.checkIn)}, from {property.checkInTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📅</span>
            <span>Check-out: {formatDate(booking.checkOut)}, until {property.checkOutTime}</span>
          </div>
          <div>
            <span className="font-semibold">Hotel address:</span> {property.location}, {property.city}, {property.country}
          </div>
          <div>
            <span className="font-semibold">E-mail:</span> desk@{property.name.toLowerCase().replace(/\s+/g, '')}.dk
          </div>
          <div>
            <span className="font-semibold">Telephone:</span> +49 002 001 030
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="font-semibold text-lg">Total price: ${booking.totalPrice}</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">paid</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium">
          Contact property
        </button>
        <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium">
          Cancel reservation
        </button>
      </div>
    </div>
  );
}

