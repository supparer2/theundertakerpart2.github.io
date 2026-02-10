# 🎬 Thai Movie Streaming Website

Website streaming film Thailand dengan desain modern dan SEO-friendly, menampilkan film terbaru dari TMDB API.

## 🌐 Live Demo

[https://supparer2.github.io/theundertakerpart2.github.io/](https://supparer2.github.io/theundertakerpart2.github.io/)

## ✨ Fitur

- 🎥 **Player Video HD** - Streaming film dengan kualitas tinggi
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat
- 🎨 **Modern UI/UX** - Desain gelap dengan animasi smooth
- 🔍 **SEO Optimized** - Meta tags lengkap untuk ranking Google
- ⚡ **Fast Loading** - Dibangun dengan Astro untuk performa maksimal
- 🌏 **Bahasa Thai** - Konten dalam bahasa Thailand

## 🚀 Deployment ke GitHub Pages

### Prasyarat

- Account GitHub
- Repository sudah dibuat dengan nama `theundertakerpart2.github.io`
- Personal Access Token dengan scope `workflow`

### Langkah-langkah Deployment

1. **Push kode ke GitHub:**
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```

2. **Aktifkan GitHub Pages:**
   - Buka repository di GitHub: `https://github.com/supparer2/theundertakerpart2.github.io`
   - Klik **Settings** → **Pages**
   - Pada **Source**, pilih **GitHub Actions**
   - Tunggu workflow selesai (cek tab Actions)

3. **Akses website:**
   - Setelah deployment selesai, website bisa diakses di:
   - `https://supparer2.github.io/theundertakerpart2.github.io/`

### Troubleshooting

**Error: Permission denied (workflow scope)**
- Buat Personal Access Token baru di GitHub Settings → Developer settings → Personal access tokens
- Centang scope: `repo` dan `workflow`
- Gunakan token tersebut saat push

**Website tidak tampil dengan benar:**
- Pastikan GitHub Pages sudah diaktifkan di Settings → Pages
- Pastikan branch `main` yang dipilih sebagai source
- Tunggu beberapa menit untuk propagasi DNS

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📦 Tech Stack

- **Framework:** Astro 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI + shadcn/ui
- **API:** The Movie Database (TMDB)
- **Deployment:** GitHub Pages

## 🎬 TMDB API

Website ini menggunakan TMDB API untuk mendapatkan data film:
- Movie ID: `1363620`
- Language: Thai (th-TH)
- API Endpoint: `https://api.themoviedb.org/3/`

## 📄 License

© 2025 Thai Movie Streaming. All rights reserved.

## 🙏 Credits

- Movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built with ❤️ using [Astro](https://astro.build/)
