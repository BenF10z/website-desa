-- Create Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Profil table
CREATE TABLE IF NOT EXISTS profil (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  value VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Potensi Desa table
CREATE TABLE IF NOT EXISTS potensi_desa (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  benefits TEXT NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update BUMDes table to include additional_images column
ALTER TABLE bumdes ADD COLUMN IF NOT EXISTS additional_images TEXT[];
ALTER TABLE bumdes ADD COLUMN IF NOT EXISTS additional_image_paths TEXT[];

-- Or if creating fresh table:
CREATE TABLE IF NOT EXISTS bumdes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Perdagangan',
  contact_person TEXT,
  contact_number TEXT,
  location TEXT,
  image_url TEXT,
  image_path TEXT,
  additional_images TEXT[], -- Array of additional image URLs
  additional_image_paths TEXT[], -- Array of additional image paths for deletion
  is_active BOOLEAN DEFAULT true,
  established_year INTEGER DEFAULT EXTRACT(year FROM NOW()),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Paket Wisata table
CREATE TABLE IF NOT EXISTS paket_wisata (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  capacity VARCHAR(50) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  image_url TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  includes TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at);
CREATE INDEX IF NOT EXISTS idx_profil_type ON profil(type);
CREATE INDEX IF NOT EXISTS idx_potensi_category ON potensi_desa(category);
CREATE INDEX IF NOT EXISTS idx_bumdes_category ON bumdes(category);
CREATE INDEX IF NOT EXISTS idx_paket_wisata_created_at ON paket_wisata(created_at);
