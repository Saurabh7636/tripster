import Image from 'next/image';
import Link from 'next/link';
import { Room } from '@/lib/types';

interface RoomCardProps {
  room: Room;
  propertyId: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export default function RoomCard({ room, propertyId, checkIn, checkOut, guests }: RoomCardProps) {
  const bookingUrl = `/booking/${propertyId}?roomId=${room.id}${checkIn ? `&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests || 2}` : ''}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      {/* Image at the top */}
      <div className="relative w-full h-64">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content below image */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Room name */}
        <h3 className="font-bold text-lg text-gray-900 mb-4">{room.name}</h3>
        
        {/* Specifications with icons */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{room.size}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{room.capacity} {room.capacity === 1 ? 'person' : 'people'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{room.bedType}</span>
          </div>
        </div>
        
        {/* Booking terms */}
        <div className="text-xs text-gray-500 mb-4">
          {!room.refundable && <span>Non-refundable, </span>}
          {room.breakfastIncluded && <span>Breakfast included</span>}
        </div>
        
        {/* Price and button at bottom */}
        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">${room.price}</div>
            <Link href={bookingUrl}>
              <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition font-medium text-sm">
                Book now for ${room.price}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

