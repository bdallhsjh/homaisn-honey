import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfrxnhwdtepijwkuxsyi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcnhuaHdkdGVwaWp3a3V4c3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzYxNzgsImV4cCI6MjA2MjY1MjE3OH0.Fkc6-aPUnm66HvOO_dy9AkMxzxVpn60NvHXH7G0y8r8';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number | string;
  type: string;
  is_available: boolean;
  images: string[];
  created_at: string;
};

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data as Product[];
}

export async function fetchProductById(id: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
  
  return data as Product;
}

export async function fetchProductsByType(type: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('type', type)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error(`Error fetching products of type ${type}:`, error);
    return [];
  }
  
  return data as Product[];
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    return null;
  }
  return data.session.user;
}