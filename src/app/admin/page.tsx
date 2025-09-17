'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Save, X, Calendar, Clock, User, Tag, BarChart3, TrendingUp, FileText, Users } from 'lucide-react';
import { blogCategories } from '@/data/blog';
import { BlogPost, BlogCategory } from '@/types/blog';
import AdminLayout from '@/components/AdminLayout';
import { getBlogPosts } from '@/lib/database';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Golden Heavy Duty Team',
    category: 'engine-transmission',
    tags: [],
    readTime: 5,
    published: false
  });

  // Load posts from Supabase
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await getBlogPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof BlogPost, value: string | string[]) => {
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        slug: generateSlug(value)
      }));
    } else if (field === 'tags') {
      const tagArray = value.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
      setFormData(prev => ({ ...prev, [field]: tagArray }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    const now = new Date().toISOString();
    const newPost: BlogPost = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title!,
      slug: formData.slug!,
      excerpt: formData.excerpt!,
      content: formData.content!,
      author: formData.author!,
      publishedAt: editingPost?.publishedAt || now,
      updatedAt: now,
      category: formData.category!,
      tags: formData.tags!,
      readTime: formData.readTime!,
      published: formData.published!
    };

    if (editingPost) {
      setPosts(prev => prev.map(post => post.id === editingPost.id ? newPost : post));
    } else {
      setPosts(prev => [...prev, newPost]);
    }

    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags,
      readTime: post.readTime,
      published: post.published
    });
    setIsCreating(true);
  };

  const handleDelete = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Golden Heavy Duty Team',
      category: 'engine-transmission',
      tags: [],
      readTime: 5,
      published: false
    });
    setIsCreating(false);
    setEditingPost(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Dashboard stats
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.published).length;
  const draftPosts = posts.filter(post => !post.published).length;
  const totalCategories = blogCategories.length;

  return (
    <AdminLayout>
      {/* Dashboard Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-lg text-gray-600">Welcome back! Here's what's happening with your content.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Posts</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{totalPosts}</p>
              <p className="text-sm text-green-600 mt-1">+2 this week</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Published</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{publishedPosts}</p>
              <p className="text-sm text-green-600 mt-1">Live on site</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Drafts</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{draftPosts}</p>
              <p className="text-sm text-yellow-600 mt-1">In progress</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Edit className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Categories</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{totalCategories}</p>
              <p className="text-sm text-purple-600 mt-1">Organized</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recent Articles
                  </h2>
                  <p className="text-gray-600 mt-1">{posts.length} total articles</p>
                </div>
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Article</span>
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="p-8 hover:bg-gray-50/50 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                        {post.published ? (
                          <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                            Published
                          </span>
                        ) : (
                          <span className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full font-medium">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-base mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span className="max-w-32 truncate">{post.tags.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-6">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-3 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all duration-200"
                        title="Edit article"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-200"
                        title="Delete article"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Create/Edit Form */}
          {isCreating && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 sticky top-8 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {editingPost ? 'Edit Article' : 'New Article'}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {editingPost ? 'Update your article' : 'Create a new blog post'}
                      </p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="p-3 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-2xl transition-all duration-200"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your article title..."
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="article-url-slug"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Article Excerpt
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Brief description of your article..."
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white"
                    >
                      {blogCategories.map((category) => (
                        <option key={category.id} value={category.slug}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags?.join(', ')}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="truck repair, maintenance, engine..."
                    />
                    <p className="text-xs text-gray-500 mt-2">Separate tags with commas</p>
                  </div>

                  {/* Read Time */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Estimated Read Time (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.readTime}
                      onChange={(e) => handleInputChange('readTime', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white"
                      min="1"
                      placeholder="5"
                    />
                  </div>

                  {/* Published */}
                  <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => handleInputChange('published', e.target.checked)}
                      className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="published" className="ml-3 text-sm font-medium text-gray-700">
                      Publish immediately
                    </label>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Article Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Write your article content here..."
                    />
                  </div>

                  {/* Save Button */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <Save className="h-5 w-5" />
                      <span>{editingPost ? 'Update' : 'Create'} Article</span>
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </AdminLayout>
  );
}
