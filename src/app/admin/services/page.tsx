'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Save, X, Search, Filter, Star, StarOff, ToggleLeft, ToggleRight } from 'lucide-react';
import { Service, ServiceCategory } from '@/types/services';
import { getServices, getServiceCategories, createService, updateService, deleteService } from '@/lib/database';
import AdminLayout from '@/components/AdminLayout';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterFeatured, setFilterFeatured] = useState<string>('all');

  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    icon: 'wrench',
    priceRange: '',
    duration: '',
    features: [],
    imageUrl: '',
    category: 'engine-transmission',
    featured: false,
    active: true,
    sortOrder: 0
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, categoriesData] = await Promise.all([
          getServices(),
          getServiceCategories()
        ]);
        setServices(servicesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof Service, value: any) => {
    if (field === 'name') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        slug: generateSlug(value)
      }));
    } else if (field === 'features') {
      const featureArray = value.split(',').map((feature: string) => feature.trim()).filter((feature: string) => feature);
      setFormData(prev => ({ ...prev, [field]: featureArray }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in name and description');
      return;
    }

    try {
      let result;
      if (editingService) {
        result = await updateService(editingService.id, formData);
      } else {
        result = await createService(formData as Omit<Service, 'id' | 'createdAt' | 'updatedAt'>);
      }

      if (result) {
        // Refresh services list
        const servicesData = await getServices();
        setServices(servicesData);
        resetForm();
        alert(editingService ? 'Service updated successfully!' : 'Service created successfully!');
      } else {
        alert('Failed to save service. Please try again.');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      shortDescription: service.shortDescription,
      icon: service.icon,
      priceRange: service.priceRange,
      duration: service.duration,
      features: service.features,
      imageUrl: service.imageUrl,
      category: service.category,
      featured: service.featured,
      active: service.active,
      sortOrder: service.sortOrder
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const success = await deleteService(id);
        if (success) {
          const servicesData = await getServices();
          setServices(servicesData);
          alert('Service deleted successfully!');
        } else {
          alert('Failed to delete service. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      icon: 'wrench',
      priceRange: '',
      duration: '',
      features: [],
      imageUrl: '',
      category: 'engine-transmission',
      featured: false,
      active: true,
      sortOrder: 0
    });
    setIsCreating(false);
    setEditingService(null);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && service.featured) ||
                           (filterFeatured === 'not-featured' && !service.featured);
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryInfo = (categorySlug: string) => {
    return categories.find(cat => cat.slug === categorySlug);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600 mt-2">Manage your service offerings and categories</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Services</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Services</option>
              <option value="featured">Featured Only</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Services ({filteredServices.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredServices.map((service) => {
                const categoryInfo = getCategoryInfo(service.category);
                return (
                  <div key={service.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {service.name}
                          </h3>
                          {service.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                          {service.active ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {service.shortDescription}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center">
                            <span className="mr-1">📁</span>
                            {categoryInfo?.name || service.category}
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">💰</span>
                            {service.priceRange}
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">⏱️</span>
                            {service.duration}
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">📅</span>
                            {formatDate(service.updatedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                          title="Edit Service"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingService ? 'Edit Service' : 'New Service'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Engine Repair"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="engine-repair"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Brief description for listings"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <input
                    type="text"
                    value={formData.priceRange}
                    onChange={(e) => handleInputChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="$500 - $2,000"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="2-4 hours"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features?.join(', ')}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Diagnostics, Repair, Warranty"
                  />
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="0"
                  />
                </div>

                {/* Status */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                      Featured
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => handleInputChange('active', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Detailed description of the service..."
                  />
                </div>

                {/* Save Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="btn-primary flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingService ? 'Update' : 'Create'} Service
                  </button>
                  <button
                    onClick={resetForm}
                    className="btn-outline"
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
