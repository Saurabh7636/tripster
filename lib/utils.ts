export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function getRatingColor(rating: number): string {
  if (rating >= 9.0) return 'bg-green-500';
  if (rating >= 8.0) return 'bg-blue-500';
  if (rating >= 6.0) return 'bg-yellow-500';
  return 'bg-gray-500';
}

export function getRatingLabel(rating: number): string {
  if (rating >= 9.0) return 'Excellent';
  if (rating >= 8.0) return 'Very good';
  if (rating >= 6.0) return 'Good';
  return 'Average';
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function calculateTotalPrice(pricePerNight: number, nights: number, cityTax: number = 0, serviceFee: number = 0): number {
  return (pricePerNight * nights) + cityTax + serviceFee;
}

