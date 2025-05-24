import { useState, useEffect } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { Database } from '../types/supabase';

export type Product = Database['public']['Tables']['products']['Row'];

export function useProduct(id: number) {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [supabase, id]);

  return { product, loading, error };
}