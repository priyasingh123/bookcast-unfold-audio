
-- Create user_stats table to track user activity
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  total_listening_time INTEGER DEFAULT 0, -- in minutes
  books_completed INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create book_likes table to track likes
CREATE TABLE IF NOT EXISTS public.book_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  book_id UUID REFERENCES public.books(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- Create deleted_books table to store deleted books
CREATE TABLE IF NOT EXISTS public.deleted_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_book_id UUID NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  audio_path TEXT,
  duration TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_by UUID REFERENCES auth.users(id)
);

-- Add RLS policies
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deleted_books ENABLE ROW LEVEL SECURITY;

-- User stats policies
CREATE POLICY "Users can view their own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Book likes policies
CREATE POLICY "Users can view all book likes" ON public.book_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own likes" ON public.book_likes
  FOR ALL USING (auth.uid() = user_id);

-- Deleted books policies (admin only)
CREATE POLICY "Admins can view deleted books" ON public.deleted_books
  FOR SELECT USING (public.has_admin_access(auth.uid()));

CREATE POLICY "Admins can manage deleted books" ON public.deleted_books
  FOR ALL USING (public.has_admin_access(auth.uid()));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_book_likes_book_id ON public.book_likes(book_id);
CREATE INDEX IF NOT EXISTS idx_book_likes_user_id ON public.book_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_deleted_books_deleted_at ON public.deleted_books(deleted_at);

-- Function to update user listening time
CREATE OR REPLACE FUNCTION public.update_user_listening_time(
  p_user_id UUID,
  p_minutes INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_stats (user_id, total_listening_time, last_active_date)
  VALUES (p_user_id, p_minutes, CURRENT_DATE)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    total_listening_time = user_stats.total_listening_time + p_minutes,
    last_active_date = CURRENT_DATE,
    updated_at = NOW();
END;
$$;

-- Function to get admin dashboard stats
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  -- Check if user has admin access
  IF NOT public.has_admin_access(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  SELECT json_build_object(
    'totalListeningTime', COALESCE(SUM(us.total_listening_time), 0),
    'totalUsers', (SELECT COUNT(*) FROM auth.users),
    'totalBooks', (SELECT COUNT(*) FROM public.books WHERE status = 'active'),
    'activeToday', (SELECT COUNT(DISTINCT user_id) FROM public.user_stats WHERE last_active_date = CURRENT_DATE),
    'topBooks', (
      SELECT COALESCE(json_agg(book_data ORDER BY likes_count DESC), '[]'::json)
      FROM (
        SELECT 
          b.title,
          b.author,
          COUNT(bl.id) as likes_count
        FROM public.books b
        LEFT JOIN public.book_likes bl ON b.id = bl.book_id
        WHERE b.status = 'active'
        GROUP BY b.id, b.title, b.author
        ORDER BY likes_count DESC
        LIMIT 5
      ) book_data
    ),
    'topCategories', (
      SELECT COALESCE(json_agg(genre_data ORDER BY percentage DESC), '[]'::json)
      FROM (
        SELECT 
          genre as name,
          ROUND((COUNT(*)::DECIMAL / (SELECT COUNT(*) FROM public.books WHERE status = 'active')) * 100) as percentage
        FROM public.books
        WHERE status = 'active'
        GROUP BY genre
        ORDER BY COUNT(*) DESC
        LIMIT 4
      ) genre_data
    )
  ) INTO result
  FROM public.user_stats us;

  RETURN result;
END;
$$;
