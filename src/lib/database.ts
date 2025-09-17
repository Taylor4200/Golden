import { supabase } from './supabase'
import { BlogPost } from '@/types/blog'
import { Service, ServiceCategory } from '@/types/services'
import { 
  Wrench, 
  Cog, 
  Shield, 
  Clock, 
  Truck, 
  Settings, 
  AlertTriangle, 
  Users,
  DollarSign,
  Zap,
  Circle,
  Calendar,
  Phone
} from 'lucide-react'

// Icon mapping function
const iconMap: Record<string, React.ComponentType> = {
  'wrench': Wrench,
  'cog': Cog,
  'shield': Shield,
  'clock': Clock,
  'truck': Truck,
  'settings': Settings,
  'gear': Cog, // Use Cog instead of Gear
  'alert-triangle': AlertTriangle,
  'users': Users,
  'dollar-sign': DollarSign,
  'zap': Zap,
  'circle': Circle,
  'calendar': Calendar,
  'phone': Phone
}

function mapIcon(iconName: string) {
  return iconMap[iconName?.toLowerCase()] || Wrench
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    category: post.category,
    tags: post.tags,
    readTime: post.read_time,
    published: post.published
  }))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    category: data.category,
    tags: data.tags,
    readTime: data.read_time,
    published: data.published
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>): Promise<BlogPost | null> {
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      published_at: now,
      updated_at: now,
      category: post.category,
      tags: post.tags,
      read_time: post.readTime,
      published: post.published
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating blog post:', error)
    return null
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    category: data.category,
    tags: data.tags,
    readTime: data.read_time,
    published: data.published
  }
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      updated_at: now,
      category: post.category,
      tags: post.tags,
      read_time: post.readTime,
      published: post.published
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating blog post:', error)
    return null
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    category: data.category,
    tags: data.tags,
    readTime: data.read_time,
    published: data.published
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    return false
  }

  return true
}

// Site Settings
export async function getSiteSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')

  if (error) {
    console.error('Error fetching site settings:', error)
    return {}
  }

  return data.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)
}

export async function updateSiteSettings(settings: Record<string, string>): Promise<boolean> {
  const now = new Date().toISOString()
  
  // Get existing settings
  const { data: existingSettings } = await supabase
    .from('site_settings')
    .select('key')

  // const existingKeys = existingSettings?.map(s => s.key) || []

  // Prepare upsert data
  const upsertData = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_at: now
  }))

  const { error } = await supabase
    .from('site_settings')
    .upsert(upsertData, { onConflict: 'key' })

  if (error) {
    console.error('Error updating site settings:', error)
    return false
  }

  return true
}

// Services
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return data.map(service => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description,
    shortDescription: service.short_description,
    icon: mapIcon(service.icon),
    priceRange: service.price_range,
    duration: service.duration,
    features: service.features,
    imageUrl: service.image_url,
    category: service.category,
    featured: service.featured,
    active: service.active,
    sortOrder: service.sort_order,
    createdAt: service.created_at,
    updatedAt: service.updated_at
  }))
}

export async function getFeaturedServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching featured services:', error)
    return []
  }

  return data.map(service => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description,
    shortDescription: service.short_description,
    icon: mapIcon(service.icon),
    priceRange: service.price_range,
    duration: service.duration,
    features: service.features,
    imageUrl: service.image_url,
    category: service.category,
    featured: service.featured,
    active: service.active,
    sortOrder: service.sort_order,
    createdAt: service.created_at,
    updatedAt: service.updated_at
  }))
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error) {
    console.error('Error fetching service:', error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    shortDescription: data.short_description,
    icon: data.icon,
    priceRange: data.price_range,
    duration: data.duration,
    features: data.features,
    imageUrl: data.image_url,
    category: data.category,
    featured: data.featured,
    active: data.active,
    sortOrder: data.sort_order,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

export async function createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .insert({
      name: service.name,
      slug: service.slug,
      description: service.description,
      short_description: service.shortDescription,
      icon: mapIcon(service.icon),
      price_range: service.priceRange,
      duration: service.duration,
      features: service.features,
      image_url: service.imageUrl,
      category: service.category,
      featured: service.featured,
      active: service.active,
      sort_order: service.sortOrder
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating service:', error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    shortDescription: data.short_description,
    icon: data.icon,
    priceRange: data.price_range,
    duration: data.duration,
    features: data.features,
    imageUrl: data.image_url,
    category: data.category,
    featured: data.featured,
    active: data.active,
    sortOrder: data.sort_order,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

export async function updateService(id: string, service: Partial<Service>): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .update({
      name: service.name,
      slug: service.slug,
      description: service.description,
      short_description: service.shortDescription,
      icon: mapIcon(service.icon),
      price_range: service.priceRange,
      duration: service.duration,
      features: service.features,
      image_url: service.imageUrl,
      category: service.category,
      featured: service.featured,
      active: service.active,
      sort_order: service.sortOrder
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating service:', error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    shortDescription: data.short_description,
    icon: data.icon,
    priceRange: data.price_range,
    duration: data.duration,
    features: data.features,
    imageUrl: data.image_url,
    category: data.category,
    featured: data.featured,
    active: data.active,
    sortOrder: data.sort_order,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

export async function deleteService(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting service:', error)
    return false
  }

  return true
}

// Service Categories
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching service categories:', error)
    return []
  }

  return data.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    color: category.color,
    sortOrder: category.sort_order,
    active: category.active,
    createdAt: category.created_at
  }))
}

export async function createServiceCategory(category: Omit<ServiceCategory, 'id' | 'createdAt'>): Promise<ServiceCategory | null> {
  const { data, error } = await supabase
    .from('service_categories')
    .insert({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color,
      sort_order: category.sortOrder,
      active: category.active
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating service category:', error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    icon: data.icon,
    color: data.color,
    sortOrder: data.sort_order,
    active: data.active,
    createdAt: data.created_at
  }
}

// Admin Authentication
export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  // For demo purposes, we'll use a simple check
  // In production, you'd use Supabase Auth or proper password hashing
  if (username === 'admin' && password === 'golden2024') {
    // Update last login
    await supabase
      .from('admin_users')
      .upsert({
        username: 'admin',
        email: 'admin@goldenheavyduty.com',
        last_login: new Date().toISOString()
      }, { onConflict: 'username' })
    
    return true
  }
  
  return false
}
