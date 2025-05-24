import { useState, useEffect } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { Database } from '../types/supabase';

export type Product = Database['public']['Tables']['products']['Row'];

export function useProducts(options?: {
  featured?: boolean;
  type?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'popularity';
  limit?: number;
}) {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let query = supabase.from('products').select('*');

        // Apply filters
        if (options?.featured) {
          query = query.eq('featured', true);
        }

        if (options?.type) {
          query = query.eq('type', options.type);
        }

        // Apply sorting
        if (options?.sortBy) {
          switch (options.sortBy) {
            case 'price_asc':
              query = query.order('price', { ascending: true });
              break;
            case 'price_desc':
              query = query.order('price', { ascending: false });
              break;
            case 'popularity':
              // Assuming we have a column for tracking popularity or we use featured as a proxy
              query = query.order('featured', { ascending: false });
              break;
          }
        }

        // Apply limit
        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setProducts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [supabase, options?.featured, options?.type, options?.sortBy, options?.limit]);

  return { products, loading, error };
}