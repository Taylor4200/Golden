'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId?: string;
  apiKey?: string;
  maxReviews?: number;
}

export default function GoogleReviews({ 
  placeId = 'ChIJK3AtkqE_bIcRhNNvo_WtrJg', // Golden Heavy Duty Repair - Correct Place ID
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
  maxReviews = 6 
}: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setError('Google Places API key not configured');
      setLoading(false);
      return;
    }

    fetchGoogleReviews();
  }, [apiKey, placeId, maxReviews]);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch live reviews from Google Places API
      const response = await fetch(`/api/google-reviews?placeId=${placeId}&maxReviews=${maxReviews}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      
      // Debug logging
      console.log('Google Reviews API Response:', {
        totalAvailable: data.totalAvailable,
        requested: data.requested,
        returned: data.returned,
        reviewsCount: data.reviews?.length || 0
      });
      
      if (data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
      } else {
        setError('No reviews found');
      }
    } catch (err) {
      console.error('Error fetching Google reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: maxReviews }, (_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Google Reviews Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(5)}
          </div>
          <span className="text-lg font-semibold text-gray-700">5.0</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">Google Reviews</span>
        </div>
        <a
          href="https://www.google.com/maps/place/Golden+Heavy+Duty+Repair+-+Onsite+and+24%2F7+Mobile+Truck+%26+Trailer+Repair/@40.0759217,-104.6435692,20z/data=!4m8!3m7!1s0x876c3fa1922d702b:0x98acadf5a36fd384!8m2!3d40.076015!4d-104.6432746!9m1!1b1!16s%2Fg%2F11x8fxtvf7?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
        >
          <span>View all reviews on Google</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Review Header */}
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
                <div className="flex items-center space-x-1 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500 ml-2">
                    {review.relative_time_description}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="relative">
              <p className="text-gray-700 leading-relaxed text-sm">
                "{review.text}"
              </p>
              <div className="absolute top-0 left-0 -mt-2 -ml-2 text-primary/20">
                <Quote className="h-8 w-8" />
              </div>
            </div>

            {/* Google Badge */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-xs text-gray-500">Google Review</span>
                </div>
                {review.author_url && (
                  <a
                    href={review.author_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary-dark transition-colors"
                  >
                    View Profile
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {error && (
        <div className="text-center text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
