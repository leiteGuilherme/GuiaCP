-- Create the storage bucket for content images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the storage bucket

-- Allow public read access to all files in the bucket
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING ( bucket_id = 'content-images' );

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated Upload" ON storage.objects 
FOR INSERT WITH CHECK ( 
  bucket_id = 'content-images' 
  AND auth.role() = 'authenticated' 
);

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated Update" ON storage.objects 
FOR UPDATE USING ( 
  bucket_id = 'content-images' 
  AND auth.role() = 'authenticated' 
);

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated Delete" ON storage.objects 
FOR DELETE USING ( 
  bucket_id = 'content-images' 
  AND auth.role() = 'authenticated' 
);
