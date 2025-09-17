'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import { blogCategories } from '@/data/blog';
import { BlogPost, BlogCategory } from '@/types/blog';
import { getBlogPosts } from '@/lib/database';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load posts from Supabase
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await getBlogPosts();
        const publishedPosts = postsData.filter(post => post.published);
        setAllPosts(postsData);
        setFilteredPosts(publishedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    let posts = allPosts.filter(post => post.published);
    
    if (category !== 'all') {
      posts = posts.filter(post => post.category === category);
    }
    
    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPosts(posts);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    let posts = allPosts.filter(post => post.published);
    
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    if (term) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(term.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
    }
    
    setFilteredPosts(posts);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryInfo = (categorySlug: string) => {
    return blogCategories.find(cat => cat.slug === categorySlug);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Golden Heavy Duty Blog
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Expert insights, maintenance tips, and industry knowledge to keep your semi truck running smoothly
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Search Articles
              </h3>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Articles ({allPosts.filter(post => post.published).length})
                </button>
                {blogCategories.map((category) => {
                  const postCount = allPosts.filter(post => post.category === category.slug && post.published).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name} ({postCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                Recent Articles
              </h3>
              <div className="space-y-4">
                {allPosts.filter(post => post.published).slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <h4 className="text-sm font-medium text-secondary group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(post.publishedAt)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-2">
                {selectedCategory === 'all' ? 'All Articles' : getCategoryInfo(selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => {
                const categoryInfo = getCategoryInfo(post.category);
                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="flex items-center mb-3">
                        <span className="text-lg mr-2">{categoryInfo?.icon}</span>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {categoryInfo?.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-secondary mb-3 line-clamp-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min read
                          </div>
                        </div>
                      </div>

                      {/* Read More */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium group"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or browse all categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
