import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          author: string
          published_at: string
          updated_at: string
          category: string
          tags: string[]
          read_time: number
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          author: string
          published_at?: string
          updated_at?: string
          category: string
          tags: string[]
          read_time: number
          published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          author?: string
          published_at?: string
          updated_at?: string
          category?: string
          tags?: string[]
          read_time?: number
          published?: boolean
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          username: string
          created_at: string
          last_login: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          created_at?: string
          last_login?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          created_at?: string
          last_login?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          slug: string
          short_description: string
          full_description: string
          icon: string
          price_range: string
          duration: string
          features: string[]
          category: string
          featured: boolean
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_description: string
          full_description: string
          icon: string
          price_range: string
          duration: string
          features: string[]
          category: string
          featured?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_description?: string
          full_description?: string
          icon?: string
          price_range?: string
          duration?: string
          features?: string[]
          category?: string
          featured?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      service_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      chatbot_leads: {
        Row: {
          id: string
          lead_data: any
          notification_sent: boolean
          notification_type: string
          twilio_message_sid: string
          resend_email_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_data: any
          notification_sent?: boolean
          notification_type?: string
          twilio_message_sid?: string
          resend_email_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_data?: any
          notification_sent?: boolean
          notification_type?: string
          twilio_message_sid?: string
          resend_email_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
