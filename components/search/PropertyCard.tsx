import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/lib/types';
import { getRatingColor, getRatingLabel } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export default function PropertyCard({ property, checkIn, checkOut, guests }: PropertyCardProps) {
  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 1;
  const totalPrice = property.pricePerNight * nights;
  
  // Get first room for display
  const firstRoom = property.rooms[0];
  const hasFreeCancellation = property.amenities.includes('Free cancellation');
  const hasBreakfast = property.amenities.includes('Breakfast included') || firstRoom?.breakfastIncluded;

  // Format bed type
  const getBedType = () => {
    if (!firstRoom) return '';
    if (firstRoom.bedType.includes('separate')) return '1x queen bed or 2 separate beds';
    if (firstRoom.bedType.includes('king') && !firstRoom.bedType.includes('queen')) return '1x king size bed';
    if (firstRoom.bedType.includes('queen')) return '1x queen size bed';
    if (firstRoom.bedType.includes('bunk')) return '1x bunk bed';
    return firstRoom.bedType;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row">
        {/* Image on the left */}
        <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover rounded-l-xl md:rounded-l-xl rounded-r-xl md:rounded-r-none"
          />
        </div>
        
        {/* Content section - relative for absolute positioning of rating */}
        <div className="flex-1 p-6 relative flex flex-col justify-between min-h-[256px]">
          {/* Rating badge - absolutely positioned at top-right */}
          <div className="absolute top-6 right-6 flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                property.rating >= 9.0 ? 'text-green-600' : 
                property.rating >= 8.0 ? 'text-blue-600' : 
                property.rating >= 6.0 ? 'text-yellow-600' : 
                'text-gray-600'
              }`}>
                {getRatingLabel(property.rating)}
              </span>
              <div className={`${getRatingColor(property.rating)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {property.rating}
              </div>
            </div>
            <span className="text-gray-600 text-sm">{property.reviewCount.toLocaleString()} reviews</span>
          </div>
          
          {/* Main content section */}
          <div className="pr-32 md:pr-40">
            <h3 className="font-bold text-xl text-gray-900 mb-1">{property.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{property.location}</p>
            
            {/* Features - separated by dot */}
            <div className="mb-2">
              {hasFreeCancellation && hasBreakfast ? (
                <span className="text-sm text-gray-700">Free cancellation • Breakfast included</span>
              ) : (
                <>
                  {hasFreeCancellation && (
                    <span className="text-sm text-gray-700">Free cancellation</span>
                  )}
                  {hasBreakfast && (
                    <span className="text-sm text-gray-700">Breakfast included</span>
                  )}
                </>
              )}
            </div>
            
            {/* Room details */}
            {firstRoom && (
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-900 mb-1">{firstRoom.name}</p>
                <p className="text-sm text-gray-600 mb-1">{getBedType()}</p>
                <p className="text-sm text-gray-600">1x bathroom</p>
              </div>
            )}
            
            {/* Tags - blue bordered oval pills */}
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full border-2 border-blue-600 text-blue-600 font-medium bg-transparent"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Bottom section with price and button - aligned to bottom-right */}
          <div className="flex items-end justify-end gap-4 mt-4 pt-4 border-t">
            <div className="text-right">
              <div className="font-bold text-2xl text-gray-900">${totalPrice}</div>
              <div className="text-gray-600 text-sm">
                {nights} night{nights !== 1 ? 's' : ''}, {guests || 2} guest{(guests || 2) !== 1 ? 's' : ''}
              </div>
            </div>
            
            <Link href={`/property/${property.id}${checkIn ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests || 2}` : ''}`}>
              <button className="bg-primary text-white py-2.5 px-6 rounded-lg hover:bg-primary-dark transition font-medium whitespace-nowrap">
                See booking options
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

