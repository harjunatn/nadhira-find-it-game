# 🔍 Find It! — game belajar bahasa Inggris bareng anak

Game "cari benda" untuk iPad (lewat browser). Satu gambar besar tampil, lalu game bilang
**"Find the lamp!"**. Siapa yang paling cepat menemukan dan men-tap lampunya, dia dapat bintang.
Setelah ketemu muncul kalimat (**"The lamp can turn on."**) dan pertanyaan **"Let's talk!"**
untuk ngobrol bareng dalam bahasa Inggris. Semua kalimat bisa dibacakan (tombol 🔊).

## Mode permainan

| Mode | Cara main |
|---|---|
| 🤝 **Together** | Satu gambar besar. Siapa pun yang ketemu, tap bendanya, lalu pilih siapa yang menemukan (Kiddo / Both / Mommy). |
| 🏁 **Race** | Layar dibagi dua, tiap pemain punya gambar sendiri, tap pertama yang benar menang. iPad **tegak**: duduk berhadapan (layar atas terbalik). iPad **miring**: duduk bersebelahan. Pemain 2 (orang tua) bisa diberi waktu tunggu supaya si kecil dapat kesempatan duluan. |
| 👀 **Explore** | Tanpa lomba: tap apa saja untuk mendengar nama dan kalimatnya. Cocok untuk pemanasan. |

Tema bawaan (12): Bedroom, Living Room, Bathroom, Kitchen, Zoo, Busy Street, Dentist, Supermarket, School, Playground, Fashion Store, Laboratory.

Fitur lain:
- **Tap salah = tetap belajar**: game bilang "Oops! That's the bed."
- **😊 Easy / 🔎 Hard**: di mode Hard benda lebih kecil dan sebagian tersembunyi di balik kardus, tas, semak, atau batu (posisinya diacak tiap main).
- **💡 Hint**: benda target berkedip dan muncul panah 👇 (otomatis setelah 15 detik, bisa diatur).
- **📒 Sticker Book**: setiap benda yang ditemukan jadi stiker koleksi.
- **📷 Photo Scenes**: foto halaman buku bergambar (seperti buku *Busy Street*), crop, lalu tap
  benda-bendanya dan ketik nama Inggrisnya. Jadi level baru!
- **⚙️ Settings**: nama & avatar pemain, arti Indonesia on/off, mode sulit (tanpa gambar petunjuk),
  pilihan suara & kecepatan bicara.

## Menjalankan

Butuh Node.js (sudah ada di Mac ini).

```bash
npm install
```

```bash
npm run dev
```

Lalu buka di iPad (iPad dan Mac harus di Wi-Fi yang sama):

```
http://192.168.1.10:5173
```

(Alamat IP Mac bisa berubah; terminal `npm run dev` menampilkan alamat "Network" yang benar.)

Supaya tampil penuh seperti aplikasi: di Safari iPad tekan **Share › Add to Home Screen**.

> Tips suara: pastikan volume iPad cukup. Semua kalimat di tema bawaan sudah direkam dengan suara
> natural (lihat bagian "Suara" di bawah), jadi tidak perlu pengaturan suara di iPad.

### Versi siap-pakai (tanpa Mac menyala)

```bash
npm run build
```

Folder `dist/` berisi website statis yang bisa di-upload ke hosting gratis mana pun
(Netlify Drop, GitHub Pages, Vercel, dll.).

## Gambar

Model 3D benda memakai [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (lisensi MIT), dimuat dari jsDelivr. Furnitur besar dan latar digambar sebagai SVG.

## Suara

Semua kalimat di tema bawaan direkam lebih dulu dengan [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M)
(model suara open-source, lisensi Apache 2.0, suara `af_heart`) dan disimpan di `public/voice/`.
Kalimat yang tidak punya rekaman (misalnya Photo Scenes buatan sendiri) memakai suara bawaan perangkat.

Setelah mengubah atau menambah kalimat di scene, rekam ulang. Hanya kalimat baru/berubah yang direkam:

```bash
cd tools/voice && npm install && node generate.mjs
```

## Untuk pengembang

- `src/scenes/*.jsx` — tema/scene bawaan. Format & aturan: `src/scenes/README.md`.
- `npm run validate` — cek semua scene (teks lengkap, area tap tidak bertabrakan, dll.).
- `npm run render -- <id>` — render scene ke PNG di `.renders/` (butuh Google Chrome).
- Tambah `?debug=1` di URL untuk melihat area tap setiap benda.
