-- Insert 5 sample keyboard products
INSERT INTO public.products (
  name, price, sale_price, rating, review_count, image, category,
  sale, new, switch_type, layout, connectivity, description, additional_images,
  stock, is_new_arrival
) VALUES
-- Gaming Keyboard
('Razer BlackWidow V3 Pro', 229.99, 199.99, 4.5, 128, '/products/blackwidow-v3.jpg', 'Gaming',
  true, false, 'Razer Green', 'Full-size', 'Wireless',
  'Premium wireless mechanical gaming keyboard with Razer Green switches for tactile feedback. Features Razer Chroma RGB lighting and multi-device connectivity.',
  ARRAY['/products/blackwidow-v3-1.jpg', '/products/blackwidow-v3-2.jpg'],
  'in-stock', false),

-- Mechanical Keyboard
('Ducky One 3 SF', 119.99, null, 4.7, 89, '/products/ducky-one-3.jpg', 'Mechanical',
  false, true, 'Cherry MX Brown', '65%', 'Wired',
  'Premium 65% mechanical keyboard with PBT double-shot keycaps. Hot-swappable switches and RGB backlighting.',
  ARRAY['/products/ducky-one-3-1.jpg', '/products/ducky-one-3-2.jpg'],
  'in-stock', true),

-- Wireless Keyboard
('Keychron K2 V2', 89.99, 79.99, 4.4, 234, '/products/keychron-k2.jpg', 'Wireless',
  true, false, 'Gateron Brown', '75%', 'Wireless/Bluetooth',
  'Wireless mechanical keyboard with Mac/Windows compatibility. Features hot-swappable switches and aluminum frame.',
  ARRAY['/products/keychron-k2-1.jpg', '/products/keychron-k2-2.jpg'],
  'in-stock', false),

-- Premium Keyboard
('HHKB Professional HYBRID', 299.99, null, 4.9, 67, '/products/hhkb-hybrid.jpg', 'Premium',
  false, true, 'Topre 45g', '60%', 'Wireless/Bluetooth',
  'Professional HHKB with Bluetooth capability. Features Topre switches and compact layout optimized for programming.',
  ARRAY['/products/hhkb-hybrid-1.jpg', '/products/hhkb-hybrid-2.jpg'],
  'low-stock', true),

-- Budget Keyboard
('Redragon K552', 34.99, 29.99, 4.3, 1234, '/products/k552.jpg', 'Budget',
  true, false, 'Outemu Blue', 'Tenkeyless', 'Wired',
  'Budget-friendly mechanical gaming keyboard with RGB backlighting. Durable metal construction and water-resistant design.',
  ARRAY['/products/k552-1.jpg', '/products/k552-2.jpg'],
  'in-stock', false);
