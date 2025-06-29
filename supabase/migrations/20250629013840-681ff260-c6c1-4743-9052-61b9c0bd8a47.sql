
-- Create books table
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_url TEXT,
  duration TEXT,
  genre TEXT NOT NULL,
  description TEXT,
  is_trending BOOLEAN DEFAULT FALSE,
  popularity_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for books table
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read books (public content)
CREATE POLICY "Anyone can view books" 
  ON public.books 
  FOR SELECT 
  USING (true);

-- Insert sample data
INSERT INTO public.books (title, author, cover_url, duration, genre, description, is_trending, popularity_score) VALUES
('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', '45m', 'romance', 'A captivating conversation with the legendary Evelyn Hugo herself.', true, 95),
('Atomic Habits', 'James Clear', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop', '52m', 'biography', 'Join James Clear as he breaks down the science of habit formation.', true, 92),
('The Silent Patient', 'Alex Michaelides', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=400&fit=crop', '38m', 'thriller', 'A thrilling discussion with psychotherapist Theo Faber.', true, 88),
('Dune', 'Frank Herbert', 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop', '61m', 'scifi', 'Paul Atreides shares his journey across the desert planet Arrakis.', true, 85),
('The Thursday Murder Club', 'Richard Osman', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', '43m', 'mystery', 'Elizabeth and the gang solve mysteries over tea and biscuits.', false, 80),
('Where the Crawdads Sing', 'Delia Owens', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop', '41m', 'fiction', 'Kya Clark tells her story of isolation and resilience in the marsh.', false, 78),
('The Midnight Library', 'Matt Haig', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop', '39m', 'fiction', 'Nora Seed explores infinite possibilities between life and death.', false, 75),
('It Ends with Us', 'Colleen Hoover', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', '47m', 'romance', 'Lily Bloom shares her journey of love, loss, and finding strength.', false, 72),
('The Psychology of Money', 'Morgan Housel', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', '55m', 'biography', 'Morgan Housel breaks down the behavioral aspects of finance.', false, 70),
('Project Hail Mary', 'Andy Weir', 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop', '58m', 'scifi', 'Ryland Grace wakes up on a spaceship with no memory of how he got there.', false, 68);
