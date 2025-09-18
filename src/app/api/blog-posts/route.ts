import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (slug) {
      query = query.eq('slug', slug);
    }

    if (published !== null) {
      query = query.eq('published', published === 'true');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in blog posts API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        meta_description: body.metaDescription,
        content: body.content,
        author: body.author,
        category: body.category,
        tags: body.tags,
        read_time: body.readTime,
        published: body.published,
        published_at: body.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in blog posts API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title: updateData.title,
        slug: updateData.slug,
        excerpt: updateData.excerpt,
        meta_description: updateData.metaDescription,
        content: updateData.content,
        author: updateData.author,
        category: updateData.category,
        tags: updateData.tags,
        read_time: updateData.readTime,
        published: updateData.published,
        published_at: updateData.published && !body.wasPublished ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in blog posts API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in blog posts API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
