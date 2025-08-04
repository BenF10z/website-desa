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

-- Create Bumdes table
CREATE TABLE IF NOT EXISTS bumdes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  contact_info VARCHAR(255),
  operating_hours VARCHAR(255),
  services TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
