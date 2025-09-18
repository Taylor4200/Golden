'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Calendar, Clock, User, Tag, FileText } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import AdminLayout from '@/components/AdminLayout';

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    metaDescription: '',
    content: '',
    author: '',
    category: '',
    tags: [] as string[],
    published: false,
    readTime: 0
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the post by ID
    const loadPost = async () => {
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/blog-posts`),
          fetch(`/api/blog-categories`)
        ]);
        
        const posts = await postsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        const foundPost = posts.find((p: any) => p.id === postId);
        
        if (foundPost) {
          setPost(foundPost);
          setFormData({
            title: foundPost.title,
            slug: foundPost.slug,
            excerpt: foundPost.excerpt,
            metaDescription: foundPost.meta_description || '',
            content: foundPost.content,
            author: foundPost.author,
            category: foundPost.category,
            tags: foundPost.tags,
            published: foundPost.published,
            readTime: foundPost.read_time
          });
        }
        
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/blog-posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          ...formData,
          wasPublished: post?.published
        }),
      });

      if (response.ok) {
        alert('Post saved successfully!');
        router.push('/admin/posts');
      } else {
        alert('Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFormData(prev => ({
      ...prev,
      content,
      readTime: calculateReadTime(content)
    }));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link href="/admin/posts" className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/posts"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
              <p className="text-gray-600 mt-2">Update your blog article</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href={`/blog/${post.slug}`}
              className="btn-outline"
              target="_blank"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter post title..."
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Brief description of the post..."
            />
          </div>

          {/* Meta Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description (SEO)
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              rows={2}
              maxLength={160}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="SEO description for search engines (160 characters max)..."
            />
            <div className="mt-1 text-sm text-gray-500">
              {formData.metaDescription.length}/160 characters
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleContentChange}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
              placeholder="Write your post content in Markdown..."
            />
            <div className="mt-2 text-sm text-gray-500">
              Supports Markdown formatting. Read time: {formData.readTime} minutes
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                  Published
                </label>
              </div>
            </div>
          </div>

          {/* Post Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Details</h3>
            <div className="space-y-4">
              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Slug */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="space-y-4">
              {/* Add Tag */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Add tag..."
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Add
                </button>
              </div>

              {/* Current Tags */}
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-gray-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Post Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                Read time: {formData.readTime} minutes
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
                Word count: {formData.content.split(/\s+/).length}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Created: {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
