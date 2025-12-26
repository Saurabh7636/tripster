import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import ImageGallery from '@/components/property/ImageGallery';
import RoomsCarousel from '@/components/property/RoomsCarousel';
import AmenitiesList from '@/components/property/AmenitiesList';
import ReviewsSection from '@/components/property/ReviewsSection';
import { mockProperties } from '@/lib/mockData';
import { getRatingColor, getRatingLabel } from '@/lib/utils';

export default function PropertyPage() {
  const router = useRouter();
  const { id, checkIn, checkOut, guests } = router.query;
  const [activeTab, setActiveTab] = useState('overview');

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Property not found</p>
      </div>
    );
  }

  const ratingBreakdown = {
    cleanliness: 10,
    amenities: 7,
    location: 9,
    comfort: 8,
    wifi: 9,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/search" className="inline-flex items-center text-primary hover:underline mb-4">
        <span>←</span>
        <span className="ml-2">Back</span>
      </Link>

      {/* Image Gallery - appears first */}
      <div className="mb-8">
        <ImageGallery images={property.images} name={property.name} mainImage={property.image} />
      </div>

      {/* Hotel name, description, and rating - appears below gallery */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
            <p className="text-gray-600">{property.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
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
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {['overview', 'rooms', 'amenities', 'policies'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Property overview</h2>
            <AmenitiesList amenities={property.amenities} />
          </div>
          <div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Map placeholder</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rooms' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Rooms</h2>
          <RoomsCarousel
            rooms={property.rooms}
            propertyId={property.id}
            checkIn={checkIn as string}
            checkOut={checkOut as string}
            guests={guests ? parseInt(guests as string) : 2}
          />
        </div>
      )}

      {activeTab === 'amenities' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Amenities</h2>
          <AmenitiesList amenities={property.amenities} />
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Policies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Check-in</h3>
              <p>From {property.checkInTime}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Check-out</h3>
              <p>Until {property.checkOutTime}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">House Rules</h3>
              <ul className="list-disc list-inside space-y-1">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <ReviewsSection reviews={property.reviews || []} overallRating={property.rating} ratingBreakdown={ratingBreakdown} />
      </div>
    </div>
  );
}

