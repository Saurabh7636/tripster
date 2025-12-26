import type { NextApiRequest, NextApiResponse } from 'next';
import { mockProperties } from '@/lib/mockData';
import { Property } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<Property[] | Property>) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      const property = mockProperties.find(p => p.id === id);
      if (property) {
        return res.status(200).json(property);
      }
      return res.status(404).json({} as Property);
    }

    return res.status(200).json(mockProperties);
  }

  return res.status(405).json({} as Property);
}

