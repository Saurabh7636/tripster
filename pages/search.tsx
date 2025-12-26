import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FilterSidebar from '@/components/search/FilterSidebar';
import PropertyCard from '@/components/search/PropertyCard';
import { SearchFilters, Property } from '@/lib/types';
import { mockProperties } from '@/lib/mockData';

export default function SearchPage() {
  const router = useRouter();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const { location, checkIn, checkOut, guests, rooms } = router.query;
    const newFilters: SearchFilters = {
      location: location as string,
      checkIn: checkIn as string,
      checkOut: checkOut as string,
      guests: guests ? parseInt(guests as string) : undefined,
      rooms: rooms ? parseInt(rooms as string) : 1,
    };
    setFilters(newFilters);
    filterProperties(newFilters);
  }, [router.query]);

  const filterProperties = (filterParams: SearchFilters) => {
    let filtered = [...mockProperties];

    if (filterParams.location) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(filterParams.location!.toLowerCase()) ||
        p.country.toLowerCase().includes(filterParams.location!.toLowerCase())
      );
    }

    if (filterParams.priceRange) {
      if (filterParams.priceRange.min !== undefined) {
        filtered = filtered.filter(p => p.pricePerNight >= filterParams.priceRange!.min!);
      }
      if (filterParams.priceRange.max !== undefined) {
        filtered = filtered.filter(p => p.pricePerNight <= filterParams.priceRange!.max!);
      }
    }

    if (filterParams.rating) {
      filtered = filtered.filter(p => p.rating >= filterParams.rating!);
    }

    if (filterParams.propertyClass) {
      filtered = filtered.filter(p => p.starRating === filterParams.propertyClass);
    }

    if (filterParams.popularFilters) {
      if (filterParams.popularFilters.includes('Breakfast included')) {
        filtered = filtered.filter(p => p.amenities.includes('Breakfast included'));
      }
      if (filterParams.popularFilters.includes('Budget hotel')) {
        filtered = filtered.filter(p => p.pricePerNight < 100);
      }
    }

    // Sort
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setAllProperties(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  useEffect(() => {
    filterProperties(filters);
  }, [filters, sortBy]);

  const activeFilters = [
    filters.popularFilters?.includes('Breakfast included') && 'Breakfast included',
  ].filter(Boolean);

  // Calculate pagination
  const totalPages = Math.ceil(allProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = allProperties.slice(startIndex, endIndex);

  // Generate page numbers (show max 5 pages)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {allProperties.length} search results for{' '}
                {filters.location && <span className="font-bold">{filters.location}</span>}
                {filters.checkIn && filters.checkOut && (
                  <>
                    ,{' '}
                    {new Date(filters.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
                    {new Date(filters.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </>
                )}
                {filters.guests && `, ${filters.guests} guests`}
                {filters.rooms && `, ${filters.rooms} room${filters.rooms > 1 ? 's' : ''}`}
              </h1>
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeFilters.map((filter, idx) => (
                    <span key={idx} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {filter}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition cursor-pointer text-gray-700 font-medium"
              >
                <option value="price">Sort by price</option>
                <option value="rating">Sort by rating</option>
                <option value="distance">Sort by distance</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {currentProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                checkIn={filters.checkIn}
                checkOut={filters.checkOut}
                guests={filters.guests}
              />
            ))}
          </div>

          {allProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Previous
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

