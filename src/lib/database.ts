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

function mapIcon(iconName: any) {
  if (!iconName || typeof iconName !== 'string') {
    return Wrench;
  }
  return iconMap[iconName.toLowerCase()] || Wrench;
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) return []
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
  if (!supabase) return null
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

// Fallback services data
const fallbackServices: Service[] = [
  {
    id: 'dot-inspections',
    name: 'DOT Inspections',
    slug: 'dot-inspections',
    description: 'Comprehensive DOT inspections to ensure your truck meets all federal safety regulations. We perform thorough checks on brakes, lights, tires, and all safety systems.',
    shortDescription: 'Complete DOT inspections to keep your truck compliant with federal regulations.',
    icon: 'shield',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Complete brake system inspection',
      'Light and electrical system check',
      'Tire and wheel inspection',
      'Steering and suspension check',
      'Exhaust system inspection',
      'Documentation and certification'
    ],
    category: 'inspection',
    featured: true,
    active: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pm-services',
    name: 'PM Services',
    slug: 'pm-services',
    description: 'Preventive maintenance services to keep your truck running smoothly and avoid costly breakdowns. Regular PM services extend vehicle life and improve reliability.',
    shortDescription: 'Preventive maintenance to keep your truck running smoothly and avoid breakdowns.',
    icon: 'settings',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Oil and filter changes',
      'Fluid level checks',
      'Belt and hose inspection',
      'Battery testing',
      'Air filter replacement',
      'Lubrication of moving parts'
    ],
    category: 'maintenance',
    featured: true,
    active: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'turbo-charger',
    name: 'Turbo Charger',
    slug: 'turbo-charger',
    description: 'Turbocharger repair and replacement services. We diagnose turbo issues, rebuild units, and install new turbos to restore engine power and efficiency.',
    shortDescription: 'Turbocharger repair, rebuild, and replacement services.',
    icon: 'zap',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Turbo diagnosis and testing',
      'Turbo rebuild services',
      'New turbo installation',
      'Boost pressure testing',
      'Oil line inspection',
      'Warranty on all work'
    ],
    category: 'engine',
    featured: true,
    active: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tires',
    name: 'Tires',
    slug: 'tires',
    description: 'Complete tire services including mounting, balancing, alignment, and repair. We carry all major tire brands and sizes for heavy-duty trucks.',
    shortDescription: 'Tire mounting, balancing, alignment, and repair services.',
    icon: 'circle',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Tire mounting and balancing',
      'Wheel alignment',
      'Tire repair and patching',
      'Tire rotation',
      'Pressure monitoring',
      'Road hazard protection'
    ],
    category: 'tires',
    featured: false,
    active: true,
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'brakes',
    name: 'Brakes',
    slug: 'brakes',
    description: 'Complete brake system services including pad replacement, rotor resurfacing, brake line repair, and ABS system diagnostics.',
    shortDescription: 'Complete brake system repair and maintenance services.',
    icon: 'alert-triangle',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Brake pad replacement',
      'Rotor resurfacing',
      'Brake line repair',
      'ABS system diagnostics',
      'Brake fluid service',
      'Emergency brake repair'
    ],
    category: 'brakes',
    featured: true,
    active: true,
    sortOrder: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cooling-system',
    name: 'Cooling System Repairs',
    slug: 'cooling-system',
    description: 'Cooling system repair and maintenance including radiator service, water pump replacement, thermostat repair, and coolant system flush.',
    shortDescription: 'Cooling system repair and maintenance services.',
    icon: 'settings',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Radiator repair and replacement',
      'Water pump service',
      'Thermostat replacement',
      'Coolant system flush',
      'Hose inspection and replacement',
      'Fan clutch repair'
    ],
    category: 'engine',
    featured: false,
    active: true,
    sortOrder: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'after-treatment',
    name: 'After Treatment Repairs',
    slug: 'after-treatment',
    description: 'After-treatment system repair including DPF cleaning, SCR system service, DEF system repair, and emissions compliance maintenance.',
    shortDescription: 'After-treatment system repair and emissions compliance services.',
    icon: 'shield',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'DPF cleaning and repair',
      'SCR system service',
      'DEF system repair',
      'Emissions testing',
      'Sensor replacement',
      'System diagnostics'
    ],
    category: 'emissions',
    featured: false,
    active: true,
    sortOrder: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'regen',
    name: 'Regen',
    slug: 'regen',
    description: 'Diesel particulate filter regeneration services including forced regen, manual regen, and regen system diagnostics.',
    shortDescription: 'Diesel particulate filter regeneration services.',
    icon: 'zap',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Forced regeneration',
      'Manual regeneration',
      'Regen system diagnostics',
      'DPF pressure testing',
      'Temperature sensor check',
      'System cleaning'
    ],
    category: 'emissions',
    featured: false,
    active: true,
    sortOrder: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'suspension',
    name: 'Suspension / Air Bags / Shocks',
    slug: 'suspension',
    description: 'Complete suspension system repair including air bag replacement, shock absorber service, spring repair, and suspension alignment.',
    shortDescription: 'Suspension system repair including air bags and shocks.',
    icon: 'settings',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Air bag replacement',
      'Shock absorber service',
      'Spring repair',
      'Suspension alignment',
      'Bushings replacement',
      'Load leveling system'
    ],
    category: 'suspension',
    featured: false,
    active: true,
    sortOrder: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'wheel-seals',
    name: 'Wheel Seals',
    slug: 'wheel-seals',
    description: 'Wheel seal replacement and hub service to prevent oil leaks and maintain proper wheel bearing lubrication.',
    shortDescription: 'Wheel seal replacement and hub service.',
    icon: 'circle',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Wheel seal replacement',
      'Hub service',
      'Bearing inspection',
      'Oil leak repair',
      'Seal installation',
      'Lubrication service'
    ],
    category: 'wheels',
    featured: false,
    active: true,
    sortOrder: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'electrical',
    name: 'Electrical',
    slug: 'electrical',
    description: 'Complete electrical system repair including wiring, alternator service, starter repair, and lighting system maintenance.',
    shortDescription: 'Complete electrical system repair and maintenance.',
    icon: 'zap',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Wiring repair',
      'Alternator service',
      'Starter repair',
      'Lighting system',
      'Battery service',
      'Fuse and relay repair'
    ],
    category: 'electrical',
    featured: false,
    active: true,
    sortOrder: 11,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cooling-heating',
    name: 'Cooling / Heating',
    slug: 'cooling-heating',
    description: 'HVAC system repair including air conditioning service, heater repair, and climate control system maintenance.',
    shortDescription: 'HVAC system repair and climate control maintenance.',
    icon: 'settings',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Air conditioning service',
      'Heater repair',
      'Climate control',
      'Blower motor service',
      'Refrigerant service',
      'System diagnostics'
    ],
    category: 'hvac',
    featured: false,
    active: true,
    sortOrder: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'trailer-repair',
    name: 'Trailer Repair',
    slug: 'trailer-repair',
    description: 'Complete trailer repair services including brake service, lighting repair, suspension work, and structural maintenance.',
    shortDescription: 'Complete trailer repair and maintenance services.',
    icon: 'truck',
    priceRange: 'Quote by call',
    duration: 'Quote by call',
    features: [
      'Trailer brake service',
      'Lighting system repair',
      'Suspension work',
      'Structural repair',
      'Coupling service',
      'Safety inspection'
    ],
    category: 'trailer',
    featured: false,
    active: true,
    sortOrder: 13,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Services
export async function getServices(): Promise<Service[]> {
  if (!supabase) return fallbackServices
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return fallbackServices
  }

  if (!data || data.length === 0) {
    return fallbackServices
  }

  return data.map(service => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description,
    shortDescription: service.short_description,
    icon: service.icon, // Keep as string, don't convert to component
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
  if (!supabase) return fallbackServices.filter(s => s.featured)
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching featured services:', error)
    return fallbackServices.filter(s => s.featured)
  }

  if (!data || data.length === 0) {
    return fallbackServices.filter(s => s.featured)
  }

  return data.map(service => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description,
    shortDescription: service.short_description,
    icon: service.icon, // Keep as string, don't convert to component
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
      icon: service.icon, // Keep as string, don't convert to component
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
    .upsert({
      id: id,
      name: service.name,
      slug: service.slug,
      description: service.description,
      short_description: service.shortDescription,
      icon: service.icon, // Keep as string, don't convert to component
      price_range: service.priceRange,
      duration: service.duration,
      features: service.features,
      image_url: service.imageUrl,
      category: service.category,
      featured: service.featured,
      active: service.active,
      sort_order: service.sortOrder,
      updated_at: new Date().toISOString()
    })
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
  if (username === 'Goldenrepair' && password === 'Goldenrepair1!') {
    // Update last login
    await supabase
      .from('admin_users')
      .upsert({
        username: 'Goldenrepair',
        email: 'admin@goldenheavyduty.com',
        last_login: new Date().toISOString()
      }, { onConflict: 'username' })
    
    return true
  }
  
  return false
}
