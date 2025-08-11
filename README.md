HoaxGuard


⚠️ Apa Itu HoaxGuard?
HoaxGuard merupakan aplikasi web yang dirancang untuk membantu pengguna mendeteksi hoaks, misinformasi, dan disinformasi. Dengan fitur analisis teks dan gambar yang mendalam, pengguna dapat mendapatkan Evaluation beserta Penjelasan AI menggunakan Google Gemini.

✨ Fitur Utama:
Analisis Teks: Masukkan teks yang ingin dianalisis untuk mengidentifikasi potensi hoaks.
Analisis Gambar: Upload gambar atau masukkan URL gambar untuk diperiksa.
Hasil Berbasis AI: Menggunakan Google Gemini untuk memberikan hasil analisis yang padat.
Penilaian Hasil: Kategori hasil menjadi Hoax, Tidak Hoax, atau Tidak Pasti.
Skor Kepercayaan: Setiap analisis memiliki skor persentase keyakinan AI.
Penjelasan Rasional: Detil penjelasan seperti penapian /inisiatif analisis.
Referensi Kredibel: Inti tautan ke sumber terpercaya yang mendukung analisis.
OCR (Optical Character Recognition): Dapat membaca dan memahami teks di dalam gambar.
🛠️ Arsitektur & Teknologi:
Platform: Next.js 14 dengan App Router.
Bahasa: TypeScript.
Komponen UI: ShadCN/UI.
Styling: Tailwind CSS.
Logika AI: Genkit (Google AI).
Deployment: Firebase App Hosting.
🌊 Alur Kerja Aplikasi:
Input Pengguna (Frontend - React): Pengguna masukkan teks atau gambar untuk analisis.
Validasi dan Panggil Analisis di Backend (Next.js Server Actions): Setelah tombol "Analyze" diklik, Server Actions memvalidasi data menggunakan Next.js dan memanggil alur analisis AI.
Proses AI di Genkit Flow: Genkit Flow menerima data, membuat prompt detail untuk model AI (Google Gemini), dan meminta analisis. Model AI aktif sebagai fact-checker dan kemudian mengembalikan hasil dalam format JSON.
Menampilkan Hasil: Hasil dari Genkit dikembalikan ke frontend dan ditampilkan pada kartu hasil yang mudah dipahami oleh pengguna.
📄 Lisensi
HoaxGuard diterbitkan di bawah lisensi MIT.

For more information or to utilize HoaxGuard, access the application directly: https://hoaxguard-ckcku.web.app/

Disclaimer: HoaxGuard dibuat sebagai alat bermanfaat, bukan sumber informativ akhir. Selalu verifikasi informasi dapat dipercaya dari sumber luar sebelum mengambil tindakan.

Sekian, selamat menggunakan HoaxGuard!
