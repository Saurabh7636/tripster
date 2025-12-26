import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SearchForm({ variant = 'hero' }: { variant?: 'hero' | 'sidebar' }) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    if (variant === 'sidebar' && router.isReady) {
      setLocation((router.query.location as string) || '');
      setCheckIn((router.query.checkIn as string) || '');
      setCheckOut((router.query.checkOut as string) || '');
      setGuests((router.query.guests as string) || '');
    }
  }, [router.isReady, router.query, variant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    params.set('rooms', '1'); // Add default rooms parameter
    router.push(`/search?${params.toString()}`);
  };

  if (variant === 'sidebar') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you going?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">📍</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in date</label>
          <div className="relative">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">📅</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out date</label>
          <div className="relative">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">📅</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <div className="relative">
            <input
              type="text"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Number of guests"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition font-medium"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 -mt-20 relative z-20 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where are you going?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder="Add date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder="Add date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Number of guests"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition flex items-center justify-center min-w-[60px]"
        >
          <span className="text-xl">→</span>
        </button>
      </form>
    </div>
  );
}

