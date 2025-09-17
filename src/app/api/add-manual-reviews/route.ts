import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Add the newer reviews you mentioned manually
    const newReviews = [
      {
        author_name: 'parth saroha',
        rating: 5,
        relative_time_description: 'a week ago',
        text: 'Genuine guys .... Best thing they let you know what\'s going on and spread their knowledge if something is wrong do this and do that for future... very helpful guys .. moreover they really have nice driver lounge and clean washroom.. would definitely recommend to stop by if truck or trailer broke down',
        time: Date.now() - (7 * 24 * 60 * 60 * 1000), // 1 week ago
        source: 'google'
      },
      {
        author_name: 'S&S Logistics',
        rating: 5,
        relative_time_description: '2 months ago',
        text: 'Thanks guys, appreciate the quick work, friendly people. Brandon and Tyler',
        time: Date.now() - (60 * 24 * 60 * 60 * 1000), // 2 months ago
        source: 'google'
      },
      {
        author_name: 'Pop',
        rating: 5,
        relative_time_description: '5 months ago',
        text: 'solid place, quick service friendly crew. no complaints!',
        time: Date.now() - (150 * 24 * 60 * 60 * 1000), // 5 months ago
        source: 'google'
      }
    ];

    // Insert into database
    const { data, error } = await supabase
      .from('reviews')
      .insert(newReviews)
      .select();

    if (error) {
      console.error('Error inserting reviews:', error);
      return NextResponse.json(
        { error: 'Failed to insert reviews' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Added ${newReviews.length} reviews to database`,
      reviews: data 
    });

  } catch (error) {
    console.error('Error adding reviews:', error);
    return NextResponse.json(
      { error: 'Failed to add reviews' },
      { status: 500 }
    );
  }
}
