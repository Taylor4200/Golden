import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching blog categories:', error);
      return NextResponse.json({ error: 'Failed to fetch blog categories' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in blog categories API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
