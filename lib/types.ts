export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  distanceFromCenter: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  image: string;
  images: string[];
  starRating: number;
  amenities: string[];
  tags: string[];
  rooms: Room[];
  reviews: Review[];
  description: string;
  checkInTime: string;
  checkOutTime: string;
  houseRules: string[];
}

export interface Room {
  id: string;
  name: string;
  size: string;
  capacity: number;
  bedType: string;
  price: number;
  image: string;
  breakfastIncluded: boolean;
  refundable: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  pros: string[];
  cons: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
  userEmail: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  nationality?: string;
  dateOfBirth?: string;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  priceRange?: {
    min?: number;
    max?: number;
  };
  rating?: number;
  amenities?: string[];
  propertyClass?: number;
  popularFilters?: string[];
}

export interface SearchParams extends SearchFilters {
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'rating' | 'distance';
}

