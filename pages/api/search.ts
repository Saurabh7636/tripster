import type { NextApiRequest, NextApiResponse } from 'next';
import { mockProperties } from '@/lib/mockData';
import { Property, SearchParams } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const params = req.query as SearchParams;
    let filtered = [...mockProperties];

    if (params.location) {
      filtered = filtered.filter(p =>
        p.city.toLowerCase().includes(params.location!.toLowerCase()) ||
        p.country.toLowerCase().includes(params.location!.toLowerCase())
      );
    }

    if (params.priceRange) {
      const priceRange = typeof params.priceRange === 'string' 
        ? JSON.parse(params.priceRange) 
        : params.priceRange;
      
      if (priceRange.min !== undefined) {
        filtered = filtered.filter(p => p.pricePerNight >= priceRange.min);
      }
      if (priceRange.max !== undefined) {
        filtered = filtered.filter(p => p.pricePerNight <= priceRange.max);
      }
    }

    if (params.rating) {
      filtered = filtered.filter(p => p.rating >= parseFloat(params.rating as string));
    }

    if (params.propertyClass) {
      filtered = filtered.filter(p => p.starRating === parseInt(params.propertyClass as string));
    }

    if (params.amenities) {
      const amenities = Array.isArray(params.amenities) ? params.amenities : [params.amenities];
      filtered = filtered.filter(p =>
        amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    // Sort
    if (params.sortBy === 'price') {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (params.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Pagination
    const page = parseInt(params.page as string) || 1;
    const limit = parseInt(params.limit as string) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return res.status(200).json({
      properties: filtered.slice(start, end),
      total: filtered.length,
      page,
      limit,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

