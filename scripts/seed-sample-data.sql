-- Insert sample gallery data
INSERT INTO gallery (title, description, category, image_url, alt_text) VALUES
('Sawah Terasering', 'Hamparan sawah hijau yang membentang luas dengan latar belakang pegunungan', 'alam', '/images/village-landscape.jpg', 'Pemandangan sawah terasering Desa Kenteng'),
('Rumah Tradisional', 'Arsitektur rumah tradisional yang masih terjaga dengan baik', 'budaya', '/placeholder.svg?height=400&width=600', 'Rumah tradisional dengan atap merah'),
('Petani Bekerja', 'Petani lokal sedang bekerja di sawah dengan metode tradisional', 'pertanian', '/placeholder.svg?height=400&width=600', 'Petani bekerja di sawah'),
('Jalur Hiking', 'Jalur pendakian yang menantang dengan pemandangan spektakuler', 'wisata', '/placeholder.svg?height=400&width=600', 'Jalur pendakian gunung'),
('Festival Budaya', 'Pertunjukan tari tradisional dalam festival tahunan desa', 'budaya', '/placeholder.svg?height=400&width=600', 'Festival budaya desa');

-- Insert sample profil data
INSERT INTO profil (type, title, content, value) VALUES
('sejarah', 'Sejarah Desa Kenteng', 'Desa Kenteng didirikan pada tahun 1945 oleh para pendatang yang mencari tanah subur untuk bercocok tanam. Nama "Kenteng" berasal dari bahasa Jawa yang berarti "tempat yang tenang dan damai".', NULL),
('visi', 'Visi Desa', 'Menjadi desa wisata yang berkelanjutan, mandiri, dan sejahtera dengan tetap melestarikan nilai-nilai budaya lokal dan kelestarian lingkungan.', NULL),
('misi', 'Misi Desa', 'Mengembangkan potensi wisata alam dan budaya, meningkatkan kesejahteraan masyarakat, melestarikan lingkungan hidup, memberdayakan ekonomi kreatif lokal, mempertahankan nilai-nilai gotong royong.', NULL),
('statistik', 'Jumlah Penduduk', 'Total penduduk Desa Kenteng saat ini', '2500'),
('statistik', 'Luas Wilayah', 'Luas total wilayah desa dalam kilometer persegi', '15 km²');

-- Insert sample potensi desa data
INSERT INTO potensi_desa (title, description, category, image_url, benefits, location) VALUES
('Pertanian Organik', 'Lahan pertanian seluas 800 hektar dengan sistem organik yang menghasilkan padi, jagung, dan sayuran berkualitas tinggi.', 'pertanian', '/placeholder.svg?height=300&width=400', 'Menghasilkan produk berkualitas tinggi, ramah lingkungan, dan bernilai jual tinggi', 'Sektor Utara Desa'),
('Wisata Alam', 'Pemandangan pegunungan yang indah, udara sejuk, dan jalur hiking yang menantang untuk para petualang.', 'wisata', '/placeholder.svg?height=300&width=400', 'Menarik wisatawan, meningkatkan ekonomi lokal, melestarikan alam', 'Kawasan Pegunungan'),
('Sumber Air Bersih', 'Mata air alami yang jernih dan melimpah, menjadi sumber kehidupan bagi seluruh desa dan sekitarnya.', 'sumber_daya', '/placeholder.svg?height=300&width=400', 'Memenuhi kebutuhan air bersih, potensi wisata air, irigasi pertanian', 'Hulu Sungai Kenteng');

-- Insert sample bumdes data
INSERT INTO bumdes (name, description, category, image_url, contact_info, operating_hours, services) VALUES
('Toko Serba Ada Kenteng', 'Menyediakan kebutuhan sehari-hari masyarakat dengan harga terjangkau dan kualitas terbaik.', 'perdagangan', '/placeholder.svg?height=250&width=350', '+62 xxx-xxxx-xxxx', 'Senin-Sabtu 07:00-21:00', 'Sembako, alat tulis, obat-obatan, kebutuhan rumah tangga'),
('Jasa Transportasi Desa', 'Layanan transportasi untuk wisatawan dan kebutuhan masyarakat desa.', 'jasa', '/placeholder.svg?height=250&width=350', '+62 xxx-xxxx-xxxx', '24 jam', 'Antar jemput wisatawan, transportasi barang, sewa kendaraan'),
('Homestay Kenteng Asri', 'Penginapan nyaman dengan suasana pedesaan yang asri dan pelayanan ramah.', 'pariwisata', '/placeholder.svg?height=250&width=350', '+62 xxx-xxxx-xxxx', 'Check-in 14:00, Check-out 12:00', 'Kamar bersih, makanan tradisional, pemandu wisata');

-- Insert sample paket wisata data
INSERT INTO paket_wisata (title, description, price, duration, capacity, rating, image_url, highlights, includes) VALUES
('Paket Wisata Alam 1 Hari', 'Jelajahi keindahan alam Desa Kenteng dalam satu hari penuh petualangan', 'Rp 150.000', '8 jam', '2-15 orang', 4.8, '/placeholder.svg?height=300&width=400', 
ARRAY['Trekking ke puncak bukit', 'Foto di sawah terasering', 'Makan siang tradisional', 'Kunjungi mata air'], 
ARRAY['Pemandu wisata', 'Makan siang', 'Transportasi lokal', 'Dokumentasi']),
('Paket Wisata Budaya 2 Hari 1 Malam', 'Mendalami budaya dan tradisi masyarakat Desa Kenteng', 'Rp 350.000', '2 hari 1 malam', '4-20 orang', 4.9, '/placeholder.svg?height=300&width=400',
ARRAY['Menginap di homestay', 'Belajar membatik', 'Memasak makanan tradisional', 'Pertunjukan seni'],
ARRAY['Homestay', '3x makan', 'Workshop budaya', 'Pemandu', 'Sertifikat']);
