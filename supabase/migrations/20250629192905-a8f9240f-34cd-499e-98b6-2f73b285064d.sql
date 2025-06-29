
-- Create RLS policies for the book-audios bucket (assuming it already exists)
CREATE POLICY "Authenticated users can view book audio files"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-audios' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert book audio files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'book-audios' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update book audio files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'book-audios' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete book audio files"
ON storage.objects FOR DELETE
USING (bucket_id = 'book-audios' AND auth.role() = 'authenticated');

-- Create a table to track user listening progress
CREATE TABLE public.listening_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  book_id UUID NOT NULL,
  current_position DECIMAL NOT NULL DEFAULT 0,
  duration DECIMAL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Enable RLS on listening_progress table
ALTER TABLE public.listening_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for listening_progress
CREATE POLICY "Users can view their own listening progress"
ON public.listening_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own listening progress"
ON public.listening_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listening progress"
ON public.listening_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listening progress"
ON public.listening_progress FOR DELETE
USING (auth.uid() = user_id);
