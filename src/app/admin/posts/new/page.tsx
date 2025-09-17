'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, ArrowLeft } from 'lucide-react';
import { blogCategories } from '@/data/blog';
import { BlogPost } from '@/types/blog';
import AdminLayout from '@/components/AdminLayout';

export default function NewPost() {
  const router = useRouter();
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof BlogPost, value: any) => {
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

    // In a real app, this would save to a database
    alert('Post saved successfully!');
    router.push('/admin/posts');
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">New Blog Post</h1>
              <p className="text-gray-600 mt-2">Create a new article for your blog</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="btn-outline"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Post
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Post Content</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                  placeholder="Enter your article title"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="article-slug"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This will be the URL: /blog/{formData.slug}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief description of the article (appears in blog listings)"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                  placeholder="Write your article content here..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can use markdown-like formatting: **bold**, *italic*, # headings, - lists
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Publish Settings</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => handleInputChange('published', e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Category & Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Organization</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {blogCategories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags?.join(', ')}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="maintenance, engine, safety"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange('readTime', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
              </div>
              <div className="p-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 line-clamp-2">
                    {formData.title || 'Untitled Post'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {formData.excerpt || 'No excerpt provided'}
                  </p>
                  <div className="flex items-center mt-3 space-x-4 text-xs text-gray-500">
                    <span>{formData.author}</span>
                    <span>{formData.readTime} min read</span>
                    <span>{formData.published ? 'Published' : 'Draft'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
