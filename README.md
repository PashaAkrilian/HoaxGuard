# HoaxGuard

**Apa Itu HoaxGuard?**  
HoaxGuard adalah aplikasi web yang dirancang untuk membantu pengguna mendeteksi **hoaks**, **misinformasi**, dan **disinformasi**.  
Dengan fitur analisis teks dan gambar berbasis **Google Gemini**, pengguna akan mendapatkan *Evaluation* dan *Penjelasan AI* secara mendalam.

---

## Fitur Utama
- **Analisis Teks** — Masukkan teks untuk mengidentifikasi potensi hoaks.  
- **Analisis Gambar** — Upload atau masukkan URL gambar untuk diperiksa.  
- **Hasil Berbasis AI** — Menggunakan *Google Gemini* untuk hasil yang ringkas dan padat.  
- **Penilaian Hasil** — Kategori hasil: *Hoax*, *Tidak Hoax*, atau *Tidak Pasti*.  
- **Skor Kepercayaan** — Persentase keyakinan AI.  
- **Penjelasan Rasional** — Detil penjelasan seperti penarikan kesimpulan dan inisiatif analisis.  
- **Referensi Kredibel** — Tautan sumber terpercaya yang mendukung analisis.  
- **OCR (Optical Character Recognition)** — Membaca teks di dalam gambar.

---

## Arsitektur & Teknologi
- **Platform**: Next.js 14 (*App Router*)  
- **Bahasa**: TypeScript  
- **UI Components**: ShadCN/UI  
- **Styling**: Tailwind CSS  
- **Logika AI**: Genkit (Google AI)  
- **Deployment**: Firebase App Hosting  

---

## Alur Kerja Aplikasi
1. **Input Pengguna (Frontend - React)** → Pengguna masukkan teks atau gambar untuk analisis.  
2. **Validasi & Analisis Backend** (*Next.js Server Actions*) → Memvalidasi data dan memanggil analisis AI.  
3. **Proses AI di Genkit Flow** → Membuat prompt detail untuk model AI (*Google Gemini*) dan menerima hasil analisis dalam format JSON.  
4. **Menampilkan Hasil** → Frontend menampilkan kartu hasil yang mudah dipahami pengguna.

---

## Lisensi
HoaxGuard dirilis di bawah **Lisensi MIT**.

---

🔗 **Akses Aplikasi**: [https://hoaxguard-ckcku.web.app/](https://hoaxguard-ckcku.web.app/)  

**Disclaimer**: HoaxGuard dibuat sebagai alat bantu, bukan sumber informasi akhir.  
Selalu verifikasi ke sumber terpercaya sebelum mengambil keputusan.
