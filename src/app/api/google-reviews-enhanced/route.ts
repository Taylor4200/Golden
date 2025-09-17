import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');
  const maxReviews = parseInt(searchParams.get('maxReviews') || '12');
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    );
  }

  if (!placeId) {
    return NextResponse.json(
      { error: 'Place ID is required' },
      { status: 400 }
    );
  }

  try {
    // Try to get more reviews by making multiple requests with different parameters
    // Google Places API has limitations, but we can try different approaches
    
    // First, get basic place info
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name,formatted_address&key=${apiKey}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    // Get all available reviews (Google limits to 5)
    const allReviews = data.result.reviews || [];
    
    // Sort by newest first
    const reviews = allReviews
      .sort((a: any, b: any) => b.time - a.time)
      .slice(0, maxReviews)
      .map((review: any) => ({
        author_name: review.author_name,
        author_url: review.author_url,
        profile_photo_url: review.profile_photo_url,
        rating: review.rating,
        relative_time_description: review.relative_time_description,
        text: review.text,
        time: review.time,
      }));

    // Add debugging info
    console.log(`Google Places API limitation: Only ${allReviews.length} reviews available (Google limits to 5)`);
    console.log(`Place: ${data.result.name}`);
    console.log(`Total ratings: ${data.result.user_ratings_total}`);
    console.log(`Average rating: ${data.result.rating}`);

    return NextResponse.json({ 
      reviews,
      totalAvailable: allReviews.length,
      requested: maxReviews,
      returned: reviews.length,
      apiLimitation: 'Google Places API only returns 5 reviews maximum',
      totalRatings: data.result.user_ratings_total,
      averageRating: data.result.rating,
      placeName: data.result.name
    });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
