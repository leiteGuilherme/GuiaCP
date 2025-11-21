-- Add the blocks column to the contents table
ALTER TABLE contents 
ADD COLUMN IF NOT EXISTS blocks JSONB DEFAULT '[]'::jsonb;
