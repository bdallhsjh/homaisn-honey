import { useState, useEffect } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { Database } from '../types/supabase';

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export function useBlogPosts(limit?: number) {
  const { supabase } = useSupabase();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [supabase, limit]);

  return { posts, loading, error };
}