import { Review } from '@/lib/types';
import { getRatingColor, getRatingLabel } from '@/lib/utils';

interface ReviewsSectionProps {
  reviews: Review[];
  overallRating: number;
  ratingBreakdown: {
    cleanliness: number;
    amenities: number;
    location: number;
    comfort: number;
    wifi: number;
  };
}

export default function ReviewsSection({ reviews, overallRating, ratingBreakdown }: ReviewsSectionProps) {
  const getReviewBadgeColor = (rating: number) => {
    if (rating >= 9.0) return 'bg-green-100 text-green-700';
    if (rating >= 8.0) return 'bg-blue-100 text-blue-700';
    if (rating >= 6.0) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Rating breakdown on the left */}
      <div>
        <div className="text-4xl font-bold text-gray-900 mb-6">{overallRating}/10</div>
        <div className="space-y-3">
          {Object.entries(ratingBreakdown).map(([category, rating]) => (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize text-gray-700">{category}</span>
                <span className="text-gray-600">{rating}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(rating / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews on the right */}
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={review.id}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-lg">{review.title}</h4>
                <span className={`${getReviewBadgeColor(review.rating)} px-3 py-1 rounded-full text-xs font-semibold`}>
                  {getRatingLabel(review.rating)} {review.rating}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{review.text}</p>
              {review.pros.length > 0 && (
                <div className="mb-2 space-y-1">
                  {review.pros.map((pro, idx) => (
                    <div key={idx} className="text-green-600 text-sm flex items-center">
                      <span className="mr-2">+</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              )}
              {review.cons.length > 0 && (
                <div className="mb-2 space-y-1">
                  {review.cons.map((con, idx) => (
                    <div key={idx} className="text-gray-600 text-sm flex items-center">
                      <span className="mr-2">-</span>
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-sm text-gray-500 mt-4">
                <span className="font-medium">{review.author}</span> - Reviewed on {review.date}
              </div>
            </div>
            {idx < reviews.length - 1 && <div className="border-t border-gray-200 my-4"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

