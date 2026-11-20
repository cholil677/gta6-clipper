# BUILD.md — GTA 6 Clipper (gta6-clipper-01)

> ⚠️ **VIDEO.json MASIH PLACEHOLDER.**
> Isinya sekarang `{"url":"https://www.youtube.com/shorts/REPLACE_AFTER_UPLOAD"}`.
> **HARUS diganti dengan URL YouTube asli SETELAH Aditya upload klipnya,**
> sebelum `check` + `submit`. Jangan submit dengan placeholder — gate menolaknya.

## Ringkasan

- Bounty: gta6-clipper-01, $500, 20 tempat berbayar, deadline **Senin 23 Nov 2026 08:00 WIB**
  (2026-11-23T01:00:00Z), hasil keluar 7 Des 2026 14:00 WIB.
- Akun: @cholil677, repo (belum dibuat): https://github.com/cholil677/gta6-clipper
- Play code: `makefun-outpost-trowel-topaz` (kode 0 dari 4; didapat via
  `node cli/makefun.mjs check --kit . --repo <build> --worktree --play-code 0`,
  2026-11-20 14:04 WIB)
- Klip final: `clip/gta6-clipper.mp4` — **30,0 detik, 1080×1920 (9:16), 30 fps,
  H.264 + AAC, 30.300.406 byte (~30,3 MB)**

## Momen yang dipilih

**Tembak-tembakan di pantai — Jason turun dari kapal langsung perang.**

- Sumber: livestream rekaman Windah Basudara, "JASON KANGEN DAN PENGEN KETEMU
  LUCIA.... Grand Theft Auto VI GAMEPLAY #2", YouTube ID `QSPPyA1736U`,
  durasi 6.597 detik (~110 menit), upload 2026-11-19.
- Segmen gameplay: **detik 6000–6025 (1:40:00–1:40:25)**.
  Jason turun dari kapal ke pantai, senapan di tangan, menembak musuh di balik
  pepohonan; satu musuh tumbang di pasir (~100:18); lalu bidikan lewat scope
  sniper (~100:24). Aksi murni, tanpa dialog panjang — cocok untuk Shorts dan
  untuk penonton global.
- Kenapa momen ini: dari 15 section yang dicek, ini satu-satunya adegan aksi
  tembak-tembakan yang berkelanjutan. Board top-20 didominasi klip aksi
  (lompat atap ke kolam, supercar ke pantai, kejar-kejaran 5 bintang, buaya,
  tank). Momen lucu lain yang sempat dipertimbangkan: burung beo yang bisa
  ngomong "Generator!" (~15:02–15:15) dan Lucia menari di bar (~70:00) —
  keduanya kalah kuat dibanding adegan perang ini.
- Facecam: stream Windah punya facecam di pojok kanan bawah. Klip ini
  **crop tengah 405×720** dari frame 1280×720, jadi facecam dan minimap
  **tidak masuk frame sama sekali**. Yang tersisa hanya gameplay murni.
  Suara asli stream (suara game + komentar Windah) dipertahankan di 25 detik
  gameplay — ini footage livestream mentah yang memang diizinkan rules,
  bukan klip jadi orang lain.

## Section yang dicek (semua dari VOD yang sama)

15 probe @ 360p, masing-masing 30 detik, frame dicek 6× per probe:

| Detik | Isi | Penilaian |
|---|---|---|
| 300–330 | Jason bench press di dek | lambat, lemah |
| 900–930 | **Burung beo bicara "Generator!"** | lucu, kandidat #2 |
| 1200–1230 | Bar pantai saat sunset, cari Andy | lambat |
| 1500–1530 | Rampok minimarket, jalan-jalan | lambat |
| 1800–1830 | Barber shop, kumis chevron | statis/menu |
| 2100–2130 | Menyetir malam, pickup hijau | bagus tapi tanpa aksi |
| 2400–2430 | Kamar gelap, Jason tidur | sangat gelap, lemah |
| 3000–3030 | Menyetir di kabut, Vice City | cantik tapi tanpa aksi |
| 3300–3330 | Jason & Lucia jalan ke mobil | story beat, lambat |
| 3900–3930 | Bar, ketemu Brian & Lori | dialog, lambat |
| 4200–4230 | Lucia menari di bar, band live | seru, kandidat #3 |
| 4800–4830 | Biliar ("SOLID POCKETED") | minigame lambat |
| 5100–5130 | Pantai malam, Jason & Lucia rebahan | gelap, lambat |
| 5700–5730 | Naik kapal di laut | indah, tenang |
| 5970–6060 | **Turun kapal → tembak-tembakan pantai → scope** | **DIPILIH** |

## Perintah yang dijalankan

Semua di sesi ini, dari `~/workspace/gta6-clipper-work/` (kecuali disebutkan lain).

```sh
# 1. Probe 15 section @ 360p (video-only), 30 detik tiap section
/tmp/yt-dlp --no-warnings -q -f "bv[height<=360]" --download-sections "*<s>-<e>" \
  -o "probe_<s>.mp4" "https://www.youtube.com/watch?v=QSPPyA1736U"
# s/e: 300-330, 900-930, 1200-1230, 1500-1530, 1800-1830, 2100-2130, 2400-2430,
#      3000-3030, 3300-3330, 3900-3930, 4200-4230, 4800-4830, 5100-5130, 5700-5730
# + 5970-6060 (90 detik, untuk memetakan adegan perang per 3 detik)

# 2. Frame probe → contact sheet (ffmpeg + PIL), lalu dilihat satu per satu
ffmpeg -ss <t> -i probe_<s>.mp4 -frames:v 1 -q:v 3 frames/p<s>_t<t>.jpg

# 3. Sumber final @ 720p + audio, section 6000-6030 (30 detik, ada handle)
 /tmp/yt-dlp --no-warnings -q -f "bv[height<=720][ext=mp4]+ba[ext=m4a]/b[height<=720]" \
  --download-sections "*6000-6030" -o "src_6000.mp4" \
  "https://www.youtube.com/watch?v=QSPPyA1736U"
# -> src_6000.mp4: 13.369.735 byte, 1280x720, AV1 + AAC, 60 fps, 30,01 detik

# 4. Narasi pitch via gTTS (Inggris, 4,73 detik)
python3 -c "from gtts import gTTS; gTTS(text='Make clips like this with AI, and earn money on make.fun!', lang='en').save('pitch.mp3')"
# -> pitch.mp3: 37.824 byte, 4,728 detik

# 5. Render klip final (ffmpeg 8.1.2)
#    - gameplay 6000-6025 (25 dtk): crop tengah 405:720:437:0 -> scale 1080:1920 lanczos, 30 fps
#    - teks hook 0-3,5 dtk: "TURUN DARI KAPAL," / "LANGSUNG PERANG!" (DejaVuSans-Bold 76, kotak hitam)
#    - end card 5 dtk (25-30): latar gelap #0b0f14 + "Make clips like this with AI" /
#      "and earn money on make.fun" (58) + "make.fun/bounty/gta6-clipper-01" (42, hijau)
#    - audio: suara asli gameplay 0-25 dtk + narasi gTTS di-delay 25,1 dtk
ffmpeg -y -i src_6000.mp4 -i pitch.mp3 -filter_complex \
 "[0:v]trim=0:25,setpts=PTS-STARTPTS,crop=405:720:437:0,scale=1080:1920:flags=lanczos,fps=30,format=yuv420p,setsar=1,drawtext=...hook1...:enable='between(t,0,3.5)',drawtext=...hook2...:enable='between(t,0,3.5)'[game];color=c=0x0b0f14:s=1080x1920:d=5:r=30,format=yuv420p,setsar=1,drawtext=...pitch1...,drawtext=...pitch2...,drawtext=...pitch3...[card];[game][card]concat=n=2:v=1:a=0[vout];[0:a]atrim=0:25,asetpts=PTS-STARTPTS[ga];[1:a]adelay=25100:all=1[pa];[ga][pa]amix=inputs=2:duration=longest:normalize=0[aout]" \
 -map "[vout]" -map "[aout]" -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p \
 -c:a aac -b:a 128k -movflags +faststart -t 30 \
 ~/workspace/gta6-clipper-build/clip/gta6-clipper.mp4
# Catatan: render pertama gagal karena SAR tidak cocok di concat (404:405 vs 1:1);
# diperbaiki dengan setsar=1 di kedua rantai, render kedua berhasil.

# 6. Verifikasi
ffprobe clip/gta6-clipper.mp4   # 1080x1920, h264 30 fps, aac, durasi 30.000000, 30.300.406 byte
# frame t=1 (hook terbaca), t=12, t=20 (musuh tumbang terlihat), t=26 & t=29 (end card terbaca) — dicek visual
# audio: gameplay 0-25 dtk mean -14,8 dB / max 0,0 dB; end card 25-30 dtk (narasi) mean -21,5 dB / max -6,7 dB

# 7. Play code + pre-submit check (dari kit)
cd ~/workspace/gta6-clipper-kit/gta6-clipper-01-kit
node cli/makefun.mjs check --kit . --repo ~/workspace/gta6-clipper-build --worktree --play-code 0
# -> play code: makefun-outpost-trowel-topaz
# -> 4 passed (competition_open, snapshot 5 file 30.305.190 byte, license_osi MIT,
#    entrypoint main.ts node22), 1 failed (transcripts_present — wajar, belum ada bundle),
#    15 skipped, 5 at submission (repo_public, repo_owner, repo_created_after_open,
#    commit_in_repo, duplicate_snapshot — semua menunggu repo GitHub dibuat)

# 8. Tes main.ts (lokal)
cd ~/workspace/gta6-clipper-build && mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
# -> OK, out/VIDEO.json sama dengan VIDEO.json (canonical + newline akhir)
```

## File entry (di ~/workspace/gta6-clipper-build/)

| File | Isi |
|---|---|
| `main.ts` | Node 22, stdlib saja; baca VIDEO.json, validasi alamat YouTube, salin ke /output/VIDEO.json (canonical). Ditulis sendiri di sesi ini. |
| `VIDEO.json` | **PLACEHOLDER** `{"url":"https://www.youtube.com/shorts/REPLACE_AFTER_UPLOAD"}` — ganti setelah upload! |
| `LICENSE` | MIT, baris pertama `SPDX-License-Identifier: MIT`, Copyright (c) 2026 cholil677 |
| `README.md` | Deskripsi entry + 3 badge live make.fun (gta6-clipper-01, cholil677, gta6-clipper) |
| `UPLOAD-INFO.md` | Judul + deskripsi siap tempel (baris wajib + play code) + cara upload dari HP |
| `BUILD.md` | File ini |
| `clip/gta6-clipper.mp4` | Klip final (30 detik, 1080×1920, 30,3 MB) |

## Langkah selanjutnya

1. **Aditya upload** `clip/gta6-clipper.mp4` dari HP sebagai Public Short
   (lihat `UPLOAD-INFO.md`), lalu kirim URL videonya ke Muse.
2. Muse ganti placeholder di `VIDEO.json` dengan URL asli.
3. Buat repo GitHub https://github.com/cholil677/gta6-clipper (public, dibuat
   setelah opening 2026-11-20T01:00:00Z — syarat `repo_created_after_open`),
   push semua file di atas.
4. Bundle transkrip (sesi builder ini + sesi parent), jalankan
   `makefun check --repo <repo> --transcripts transcripts.tar.gz`
   (harapannya ~4 passed, 0 failed; `transcripts_present` terpenuhi setelah bundle).
5. Submit dengan keypair lama sebelum **Senin 23 Nov 2026 08:00 WIB**,
   poll status, simpan claim code yang diterima (jangan tulis di MEMORY.md).
   Jangan resubmit selama status masih processing.

## Risiko / catatan

- Peringkat ditentukan **murni jumlah views YouTube** di deadline; target realistis
  masuk top-20 sekitar 1.000+ views (ambang #20 saat dicek 13:35 WIB 20 Nov: 862 views).
- Klip ini editan sendiri dari footage mentah livestream (bukan klip jadi orang lain);
  pembuatan lengkap ada di transkrip sesi ini.
- Di frame ~100:10–100:12 Jason sempat setengah keluar dari tepi kiri crop — wajar
  karena crop tengah statis; adegan tetap terbaca sebagai tembak-tembakan.
- Suara asli stream dipertahankan di bagian gameplay; narasi gTTS hanya di end card.
- Jangan pakai channel YouTube anak-anak Lala & Mochi untuk upload klip GTA 6 ini
  (audiens/monetisasi) — pakai channel terpisah/pribadi.
