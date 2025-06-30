
-- Create storage bucket for book audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-audios', 'book-audios', true);

-- Create policy to allow public access to audio files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-audios');

-- Create policy to allow authenticated users to upload audio files
CREATE POLICY "Authenticated users can upload audio files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'book-audios');

-- Create policy to allow authenticated users to update audio files
CREATE POLICY "Authenticated users can update audio files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'book-audios');

-- Create policy to allow authenticated users to delete audio files
CREATE POLICY "Authenticated users can delete audio files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'book-audios');
