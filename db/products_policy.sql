-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to products
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to view products
CREATE POLICY "Allow authenticated users to view products"
ON public.products
FOR SELECT
TO authenticated
USING (true);
