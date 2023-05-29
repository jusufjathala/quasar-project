# quasar-project

Proyek latihan menggunakan Quasar
Dibuat oleh Jusuf Junior Athala

# how to use

1. install dengan 'npm init quasar'
2. install library : 'npm install axios'
3. pada directory, gunakan command 'quasar dev'
4. buka localhost http://localhost:8080/#/ pada internet browser

# progress

1. 22/05/2023 (Initial Build)
   Added feature:

- gambar avatar dan nama pada sidebar
- home page, help page, test page
- tanggal pada header
- list of tasks di home page
- menghitung tasks yang telah dicentang

2. 23/05/2023
   Added feature:

- bisa menghapus task
- collapsible daftar sistem rekomendasi di sidebar
- user page
- tabel user dengan profile picture masing-masing user

  Removed :

- Test page

3. 24/05/2023
   Added feature:

- add row pada tabel user
- delete row pada tabel user
- edit user
- set active user

  Bug :

- edit user

4. 25/05/2023
   Added feature:

- add perusahaan page
- add perusahaan tabel
- load data perusahaan dari API
- login API untuk mendapatkan token
- melakukan POST untuk membuat row baru pada API setelah login

  Bug Fixed:

- bug edit role user

5. 26/05/2023
   Added feature:

- new attribute untuk user jenis kelamin (radio button), jenis transportasi (drop down)
- upload file profile picture untuk user

  Bug :

- bug tidak bisa show image dari src yang dynamic

  ToDo :

- membuat dialog create user, dengan segala jenis input seperti radio, dropdown, dll.
- membuat dialog create perusahaan
- membuat login page
- menyembunyikan kolom yang tidak diperlukan pada perusahaan
- membuat halaman detail perusahaan
- mengatur pagination menjadi non lokal untuk tabel perusahaan

6. 29/05/2023
   Added feature:

- Implementasi sistem login : telah dibuat halaman login, telah dibuat tombol logout pada MainLayout, user tidak dapat mengakses halaman selain halaman login jika belum login, user tidak bisa mengakses halaman login jika sudah login, user hanya bisa mengakses halaman login jika sudah menekan tombol logout
- setelah berhasil login dari halaman login, user menggunakan token dan dapat menambahkan data perusahaan pada API
- perusahaan dapat diedit secara lokal (belum terhubung ke API)

  Bug Fixed:

- bug image src dynamic

  Bug :

- bug list nama kabupaten / kota

  ToDo :

- membuat dialog create perusahaan
- menyembunyikan kolom yang tidak diperlukan pada perusahaan
- membuat halaman detail perusahaan
- mengatur pagination menjadi non lokal untuk tabel perusahaan
