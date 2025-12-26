import Image from 'next/image';
import { Property, Room } from '@/lib/types';
import { calculateNights, calculateTotalPrice, formatDate } from '@/lib/utils';

interface BookingSummaryProps {
  property: Property;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function BookingSummary({ property, room, checkIn, checkOut, guests }: BookingSummaryProps) {
  const nights = calculateNights(checkIn, checkOut);
  const roomTotal = room.price * nights;
  const cityTax = 40;
  const serviceFee = 20;
  const total = calculateTotalPrice(room.price, nights, cityTax, serviceFee);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-xl text-gray-900">{property.name} {'*'.repeat(property.starRating)}</h3>
          <p className="text-gray-600 text-sm">{property.description}</p>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Check-in:</span> {formatDate(checkIn)}
          </div>
          <div>
            <span className="font-semibold">Check-out:</span> {formatDate(checkOut)}
          </div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">{room.name}:</span>
            <span>${room.price}/night</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{nights} nights:</span>
            <span>${roomTotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>City tax:</span>
            <span>${cityTax}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service fee:</span>
            <span>${serviceFee}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>TOTAL:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

