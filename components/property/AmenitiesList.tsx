interface AmenitiesListProps {
  amenities: string[];
}

const amenityIcons: Record<string, string> = {
  'Free Wi-Fi': '📶',
  'Air conditioning': '❄️',
  'Private bathroom': '🚿',
  'Key card access': '🔑',
  'Free parking': '🅿️',
  '24-hour front desk': '🕐',
  'Spa': '💆',
  'Free cancellation': '✅',
};

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {amenities.map((amenity, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <span className="text-2xl">{amenityIcons[amenity] || '✓'}</span>
          <span className="text-gray-700">{amenity}</span>
        </div>
      ))}
    </div>
  );
}

