
-- Remove the podcasts bucket and its policies
DROP POLICY IF EXISTS "Authenticated users can view podcast files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can insert podcast files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update podcast files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete podcast files" ON storage.objects;

DELETE FROM storage.buckets WHERE id = 'podcasts';

-- Update the book-audios bucket policies to be more comprehensive
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
