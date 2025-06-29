
-- Make the book-audios bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'book-audios';

-- Update policies to allow public access for viewing files
DROP POLICY IF EXISTS "Authenticated users can view book audio files" ON storage.objects;

CREATE POLICY "Public can view book audio files"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-audios');

-- Keep authenticated-only policies for modifications
-- (insert, update, delete policies remain the same for security)
