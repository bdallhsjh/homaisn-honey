/*
  # Create blog_posts table and add featured column to products

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `author` (text)

  2. Changes
    - Add `featured` column to `products` table

  3. Security
    - Enable RLS on `blog_posts` table
    - Add policy for authenticated users to read blog posts
    - Add policy for admin users to manage blog posts
*/

-- Add featured column to products table
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'featured'
  ) THEN
    ALTER TABLE products ADD COLUMN featured boolean DEFAULT false;
  END IF;
END $$;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  author text NOT NULL
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for blog_posts
CREATE POLICY "Allow public read access to blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin users to manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE is_admin = true))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE is_admin = true));