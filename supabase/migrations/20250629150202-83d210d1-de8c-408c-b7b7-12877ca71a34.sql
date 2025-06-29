
-- Create admin_users table for tracking admin invitations and roles
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_by UUID REFERENCES auth.users(id),
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')) DEFAULT 'editor',
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy to allow admins to view all admin users
CREATE POLICY "Admins can view all admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND role = 'admin' AND status = 'accepted'
    )
  );

-- Policy to allow admins to insert new admin users
CREATE POLICY "Admins can invite new admin users" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND role = 'admin' AND status = 'accepted'
    )
  );

-- Policy to allow admins to update admin users
CREATE POLICY "Admins can update admin users" 
  ON public.admin_users 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND role = 'admin' AND status = 'accepted'
    )
  );

-- Add status and archived fields to books table
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft'));
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS audio_path TEXT;

-- Create storage bucket for book audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('book-audios', 'book-audios', false);

-- Create storage policies for book audio files
CREATE POLICY "Authenticated users can view audio files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'book-audios' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can upload audio files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'book-audios' AND 
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND status = 'accepted'
    )
  );

CREATE POLICY "Admins can update audio files" 
  ON storage.objects 
  FOR UPDATE 
  USING (
    bucket_id = 'book-audios' AND 
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND status = 'accepted'
    )
  );

CREATE POLICY "Admins can delete audio files" 
  ON storage.objects 
  FOR DELETE 
  USING (
    bucket_id = 'book-audios' AND 
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND status = 'accepted'
    )
  );

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = $1 AND role = 'admin' AND status = 'accepted'
  );
$$;

-- Function to check if user has admin access (admin or editor)
CREATE OR REPLACE FUNCTION public.has_admin_access(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = $1 AND status = 'accepted'
  );
$$;
