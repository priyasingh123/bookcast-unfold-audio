
-- Create authors table
CREATE TABLE public.authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create genres table
CREATE TABLE public.genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#6366f1',
  gradient TEXT DEFAULT 'from-blue-500 to-purple-600',
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add author_id to books table
ALTER TABLE public.books ADD COLUMN author_id UUID REFERENCES public.authors(id);

-- Enable RLS for new tables
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;

-- Create policies to allow everyone to read authors and genres
CREATE POLICY "Anyone can view authors" 
  ON public.authors 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view genres" 
  ON public.genres 
  FOR SELECT 
  USING (true);

-- Insert sample authors
INSERT INTO public.authors (name, avatar_url, bio) VALUES
('Taylor Jenkins Reid', 'https://images.unsplash.com/photo-1494790108755-2616b612b882?w=150&h=150&fit=crop&crop=face', 'Bestselling author known for contemporary fiction'),
('James Clear', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Author and speaker focused on habits and decision making'),
('Alex Michaelides', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Psychotherapist turned bestselling thriller author'),
('Frank Herbert', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face', 'Science fiction legend and creator of Dune'),
('Richard Osman', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face', 'Television presenter and mystery novelist'),
('Delia Owens', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'Zoologist and acclaimed fiction author'),
('Matt Haig', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 'Author exploring mental health and philosophy'),
('Colleen Hoover', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 'Romance and contemporary fiction bestseller'),
('Morgan Housel', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Partner at Collaborative Fund and finance writer'),
('Andy Weir', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Science fiction author known for The Martian');

-- Insert sample genres
INSERT INTO public.genres (name, color, gradient, icon) VALUES
('Romance', '#f472b6', 'from-pink-500 to-rose-500', '💕'),
('Biography', '#8b5cf6', 'from-purple-500 to-indigo-600', '📖'),
('Thriller', '#ef4444', 'from-red-500 to-orange-600', '🔥'),
('Science Fiction', '#3b82f6', 'from-blue-500 to-cyan-500', '🚀'),
('Mystery', '#6366f1', 'from-indigo-500 to-purple-500', '🔍'),
('Fiction', '#10b981', 'from-emerald-500 to-teal-500', '📚'),
('Fantasy', '#a855f7', 'from-violet-500 to-purple-600', '✨');

-- Update books with author references
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Taylor Jenkins Reid') WHERE author = 'Taylor Jenkins Reid';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'James Clear') WHERE author = 'James Clear';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Alex Michaelides') WHERE author = 'Alex Michaelides';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Frank Herbert') WHERE author = 'Frank Herbert';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Richard Osman') WHERE author = 'Richard Osman';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Delia Owens') WHERE author = 'Delia Owens';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Matt Haig') WHERE author = 'Matt Haig';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Colleen Hoover') WHERE author = 'Colleen Hoover';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Morgan Housel') WHERE author = 'Morgan Housel';
UPDATE public.books SET author_id = (SELECT id FROM public.authors WHERE name = 'Andy Weir') WHERE author = 'Andy Weir';
