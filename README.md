# Sales Page Generator

Aplikasi ini adalah sebuah website untuk membuat halaman penjualan atau sales page dengan mudah. Dibuat menggunakan Laravel dan React dengan bantuan Inertia.js.

## Tentang Aplikasi

Aplikasi ini membantu pengguna untuk membuat halaman penjualan yang menarik tanpa perlu keahlian coding. Dengan fitur fitur yang tersedia, pengguna bisa membuat sales page yang profesional dalam waktu singkat.

## Fitur Utama

1. **Login dan Registrasi** - Pengguna bisa membuat akun baru atau login ke akun yang sudah ada
2. **Dashboard** - Halaman utama untuk mengelola sales page yang sudah dibuat
3. **Membuat Sales Page** - Fitur untuk membuat halaman penjualan baru
4. **Template yang Tersedia** - Beberapa template yang bisa dipakai untuk membuat sales page
5. **Team Collaboration** - Bisa bekerja sama dengan tim dalam membuat sales page
6. **Landing Page** - Halaman informasi untuk pengunjung website
7. **Prompt Generator** - Fitur AI untuk membantu membuat konten sales page (untuk user yang sudah login)

## Teknologi yang Dipakai

- **Backend**: Laravel 11
- **Frontend**: React 19 dengan Inertia.js
- **Database**: MySQL/SQLite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Laravel Fortify

## Cara Install

1. Clone repository ini
2. Copy file `.env.example` menjadi `.env`
3. Install dependencies PHP:
   ```
   composer install
   ```
4. Install dependencies JavaScript:
   ```
   npm install
   ```
5. Generate application key:
   ```
   php artisan key:generate
   ```
6. Jalankan migration:
   ```
   php artisan migrate
   ```
7. Jalankan seeder untuk membuat data awal:
   ```
   php artisan db:seed
   ```
8. Build assets:
   ```
   npm run build
   ```
9. Jalankan aplikasi:
   ```
   php artisan serve
   ```

## Cara Pakai

1. Buka website di browser
2. Untuk pengunjung biasa, bisa lihat halaman landing di `/landing`
3. Untuk membuat sales page, daftar dulu atau login
4. Setelah login, bisa akses dashboard dan fitur prompt generator
5. Pilih template yang diinginkan
6. Isi konten sesuai kebutuhan
7. Sales page siap dipakai

## Akun Default

Setelah menjalankan seeder, ada beberapa akun yang bisa dipakai untuk testing:

- Email: `admin@example.com` | Password: `password123`
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

## Struktur Folder

- `app/` - Kode backend Laravel
- `resources/js/` - Kode frontend React
- `database/` - Migration dan seeder
- `routes/` - Route aplikasi
- `config/` - Konfigurasi aplikasi

## Catatan

Pastikan sudah install PHP versi 8.2 atau lebih baru, Node.js, dan Composer sebelum menjalankan aplikasi ini. Juga siapkan database MySQL atau bisa pakai SQLite untuk development.

## License

Aplikasi ini open source dan bisa dipakai untuk belajar maupun project komersial.