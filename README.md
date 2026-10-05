# Portofolio — Mohammad Iqbal Firdaus

Website portofolio untuk posisi Data Analyst / Data Scientist / AI Engineer, dibangun dengan React + Vite + Tailwind CSS.

## Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk produksi

```bash
npm run build
```

Hasilnya ada di folder `dist/`.

## Deploy ke Vercel

1. Push folder ini ke repository GitHub.
2. Buka [vercel.com](https://vercel.com), pilih **New Project**, hubungkan repo GitHub tersebut.
3. Framework preset otomatis terdeteksi sebagai **Vite** — klik **Deploy**.

## Deploy ke Netlify

1. Push folder ini ke repository GitHub (atau drag-drop folder `dist/` hasil build ke [app.netlify.com/drop](https://app.netlify.com/drop)).
2. Jika lewat GitHub: build command `npm run build`, publish directory `dist`.

## Yang perlu diperbarui sebelum dipakai melamar kerja

- **Link LinkedIn** di `src/App.jsx` masih perkiraan (`linkedin.com/in/mohamad-iqbal`) — ganti dengan URL profil asli kamu.
- **Deskripsi proyek** akan lebih kuat dengan angka konkret (contoh: akurasi model C4.5, persentase efisiensi waktu pelaporan yang dihasilkan dashboard BI).
