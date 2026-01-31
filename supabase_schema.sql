-- Create the wishes table
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  from_name TEXT,
  to_name TEXT,
  data JSONB NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read a wish by ID
CREATE POLICY "Allow public read access"
ON wishes FOR SELECT
USING (true);

-- Allow anyone to insert a wish
CREATE POLICY "Allow public insert access"
ON wishes FOR INSERT
WITH CHECK (true);
