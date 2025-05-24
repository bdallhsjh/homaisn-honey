export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          created_at: string
          name: string
          price: number
          weight: string
          type: string
          description: string
          in_stock: boolean
          featured: boolean
          image_url: string
          additional_images: string[] | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          price: number
          weight: string
          type: string
          description: string
          in_stock?: boolean
          featured?: boolean
          image_url: string
          additional_images?: string[] | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          price?: number
          weight?: string
          type?: string
          description?: string
          in_stock?: boolean
          featured?: boolean
          image_url?: string
          additional_images?: string[] | null
        }
      }
      blog_posts: {
        Row: {
          id: number
          created_at: string
          title: string
          content: string
          image_url: string
          author: string
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          content: string
          image_url: string
          author: string
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          content?: string
          image_url?: string
          author?: string
        }
      }
      orders: {
        Row: {
          id: number
          created_at: string
          user_id: string
          status: string
          total: number
          shipping_address: Json
          phone_number: string
        }
        Insert: {
          id?: number
          created_at?: string
          user_id: string
          status?: string
          total: number
          shipping_address: Json
          phone_number: string
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          status?: string
          total?: number
          shipping_address?: Json
          phone_number?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          price: number
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          price: number
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          price?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}