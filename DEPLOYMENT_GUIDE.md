# 🚀 Panduan Deploy ke GitHub Pages

## ⚠️ Masalah yang Terjadi

GitHub Pages mencoba menggunakan **Jekyll** (default) untuk build, padahal ini adalah **Astro project**. 

Error yang muncul:
```
GitHub Pages: jekyll v3.10.0
```

## ✅ Solusi

File `.nojekyll` sudah ditambahkan untuk menonaktifkan Jekyll, dan GitHub Actions workflow sudah dikonfigurasi untuk build Astro.

---

## 📝 Langkah-langkah Deploy

### 1️⃣ Push Kode ke GitHub

Dari komputer Anda, jalankan:

```bash
# Pull perubahan terbaru
git pull origin main

# Atau jika ada conflict, paksa pull
git fetch origin
git reset --hard origin/main

# Push ke GitHub
git push origin main
```

**PENTING:** Pastikan Anda menggunakan Personal Access Token dengan scope **`workflow`**!

### 2️⃣ Periksa GitHub Actions

1. Buka: https://github.com/supparer2/theundertakerpart2.github.io
2. Klik tab **Actions**
3. Anda akan melihat workflow "Deploy to GitHub Pages" sedang berjalan
4. Tunggu sampai selesai (✅ hijau) - biasanya 2-3 menit

**Log yang benar akan terlihat seperti:**
```
Run npm run build
> astro@0.0.1 build
> astro build

building client (vite)
✓ built in 2.5s
✓ Completed in 3.5s
```

### 3️⃣ Aktifkan GitHub Pages (Jika Belum)

1. Buka: https://github.com/supparer2/theundertakerpart2.github.io/settings/pages
2. Pada **Source**, pilih: **GitHub Actions** (bukan Branch!)
3. Simpan

### 4️⃣ Akses Website

Setelah workflow selesai, website bisa diakses di:
**https://supparer2.github.io/theundertakerpart2.github.io/**

---

## 🔧 Troubleshooting

### ❌ Masalah: "Permission denied" saat push

**Solusi:**
1. Buat Personal Access Token baru:
   - Buka: https://github.com/settings/tokens
   - Generate new token (classic)
   - Centang scope: `repo` dan `workflow`
   - Copy token

2. Saat push, gunakan:
   ```bash
   git push https://[TOKEN]@github.com/supparer2/theundertakerpart2.github.io.git main
   ```

### ❌ Masalah: Workflow gagal dengan error Jekyll

**Solusi:**
File `.nojekyll` sudah ditambahkan. Pastikan:
1. File ini ada di repository
2. GitHub Pages Source diset ke **GitHub Actions** (bukan Branch)

### ❌ Masalah: Website tampil tapi style masih rusak

**Solusi:**
1. Clear browser cache (Ctrl + F5)
2. Tunggu 2-5 menit untuk propagasi CDN GitHub
3. Periksa di browser Incognito/Private

### ❌ Masalah: 404 Not Found

**Solusi:**
1. Pastikan GitHub Pages sudah aktif di Settings → Pages
2. Pastikan Source diset ke **GitHub Actions**
3. Tunggu workflow selesai (cek tab Actions)

---

## 📊 Cara Cek Status Deployment

### Via GitHub Actions:
1. Buka: https://github.com/supparer2/theundertakerpart2.github.io/actions
2. Klik workflow run terbaru
3. Lihat status setiap step

### Via Browser:
1. Akses: https://supparer2.github.io/theundertakerpart2.github.io/
2. Buka Developer Tools (F12)
3. Cek tab Console untuk error
4. Cek tab Network untuk failed requests

---

## ✨ Hasil Akhir

Website akan tampil dengan:
- ✅ Style yang sempurna (dark theme)
- ✅ Video player yang berfungsi
- ✅ Responsive di semua device
- ✅ SEO-friendly
- ✅ Loading cepat

---

## 📞 Butuh Bantuan?

Jika masih ada masalah setelah mengikuti panduan ini, screenshot error message dan bagikan untuk troubleshooting lebih lanjut.
