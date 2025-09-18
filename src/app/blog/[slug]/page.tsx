'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Tag } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import Head from 'next/head';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const [postResponse, allPostsResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/blog-posts?slug=${slug}`),
          fetch('/api/blog-posts?published=true'),
          fetch('/api/blog-categories')
        ]);
        
        const postData = await postResponse.json();
        const allPosts = await allPostsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        const foundPost = postData.find((p: any) => p.slug === slug);
        setPost(foundPost);
        setRecentPosts(allPosts.slice(0, 3));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find(cat => cat.slug === post.category);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Convert markdown-like content to HTML (simple implementation)
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-secondary mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-semibold text-secondary mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold text-secondary mb-3 mt-4">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-xl font-semibold text-secondary mb-2 mt-3">$1</h4>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-secondary">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/\n\n/gim, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/^(?!<[h|l])/gim, '<p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/(<li.*<\/li>)/gim, '<ul class="list-none mb-4">$1</ul>');
  };

  return (
    <>
      <Head>
        <title>{post.title} | Golden Heavy Duty Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://goldenheavyduty.com/blog/${post.slug}`} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.meta_description || post.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            <button className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Article Header */}
              <div className="p-8 border-b border-gray-200">
                {/* Category Badge */}
                <div className="flex items-center mb-4">
                  <span className="text-lg mr-2">{categoryInfo?.icon}</span>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {categoryInfo?.name}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 mb-6">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {post.readTime} min read
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />
              </div>
            </article>

            {/* CTA Section */}
            <div className="mt-12 bg-primary rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Need Expert Help in Hudson, CO?
              </h3>
              <p className="text-lg mb-6">
                Call Golden Heavy Duty Truck Repair today for immediate assistance or to schedule a comprehensive inspection.
              </p>
              <a
                href="tel:+13033049993"
                className="btn-secondary inline-flex items-center text-lg px-8 py-4"
              >
                <span className="mr-2">📞</span>
                Call (303) 304-9993
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                Recent Articles
              </h3>
              <div className="space-y-4">
                {recentPosts
                  .filter(recentPost => recentPost.id !== post.id)
                  .slice(0, 3)
                  .map((recentPost) => (
                    <Link
                      key={recentPost.id}
                      href={`/blog/${recentPost.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium text-secondary group-hover:text-primary transition-colors line-clamp-2">
                        {recentPost.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(recentPost.publishedAt)}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                Need Service?
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Golden Heavy Duty Truck Repair</strong>
                </div>
                <div>
                  806 Cedar St<br />
                  Hudson, CO 80642
                </div>
                <div>
                  <a
                    href="tel:+13033049993"
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    (303) 304-9993
                  </a>
                </div>
                <div>
                  24/7 Emergency Road Service
                </div>
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center block mt-4"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
