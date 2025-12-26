import { useState } from 'react';
import { SearchFilters } from '@/lib/types';
import SearchForm from './SearchForm';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [popularFilters, setPopularFilters] = useState<string[]>(filters.popularFilters || []);
  const [priceRange, setPriceRange] = useState<string>(() => {
    if (filters.priceRange?.max && filters.priceRange.max < 50) return 'less-50';
    if (filters.priceRange?.max && filters.priceRange.max < 100) return '50-100';
    if (filters.priceRange?.max && filters.priceRange.max < 150) return '100-150';
    if (filters.priceRange?.min && filters.priceRange.min >= 150) return '150-plus';
    return '';
  });
  const [rating, setRating] = useState<string>(filters.rating?.toString() || 'any');

  const handlePopularFilterToggle = (filter: string) => {
    const newFilters = popularFilters.includes(filter)
      ? popularFilters.filter(f => f !== filter)
      : [...popularFilters, filter];
    setPopularFilters(newFilters);
    onFilterChange({ ...filters, popularFilters: newFilters });
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
    let priceRangeObj = {};
    if (range === 'less-50') priceRangeObj = { max: 49 };
    else if (range === '50-100') priceRangeObj = { min: 50, max: 100 };
    else if (range === '100-150') priceRangeObj = { min: 100, max: 150 };
    else if (range === '150-plus') priceRangeObj = { min: 150 };
    onFilterChange({ ...filters, priceRange: priceRangeObj });
  };

  const handleRatingChange = (ratingValue: string) => {
    setRating(ratingValue);
    onFilterChange({ ...filters, rating: ratingValue === 'any' ? undefined : parseFloat(ratingValue) });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h2 className="font-bold text-lg mb-4">Your search</h2>
        <SearchForm variant="sidebar" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Popular filters</h3>
          <button
            onClick={() => {
              setPopularFilters([]);
              onFilterChange({ ...filters, popularFilters: [] });
            }}
            className="text-primary text-sm hover:underline"
          >
            Reset
          </button>
        </div>
        <div className="space-y-2">
          {['Budget hotel', 'Breakfast included', 'Free airport shuttle', 'Hostel/Backpacker'].map((filter) => (
            <label key={filter} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={popularFilters.includes(filter)}
                onChange={() => handlePopularFilterToggle(filter)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-gray-700">{filter}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price per night</h3>
        <div className="space-y-2">
          {[
            { value: 'less-50', label: 'Less than $50' },
            { value: '50-100', label: '$50 to $100' },
            { value: '100-150', label: '$100 to $150' },
            { value: '150-plus', label: '$150 and more' },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={option.value}
                checked={priceRange === option.value}
                onChange={(e) => handlePriceRangeChange(e.target.value)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Guest rating</h3>
        <div className="space-y-2">
          {[
            { value: 'any', label: 'Any' },
            { value: '9', label: 'Excellent' },
            { value: '8', label: 'Very good' },
            { value: '6', label: 'Good' },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={option.value}
                checked={rating === option.value}
                onChange={(e) => handleRatingChange(e.target.value)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Property class</h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              onClick={() => onFilterChange({ ...filters, propertyClass: stars })}
              className={`px-3 py-1 rounded ${
                filters.propertyClass === stars
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stars}*
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

