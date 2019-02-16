# Menggunakan Library atau Komponen Pre-Existing

> Modul ini akan menggunakan **ExpressJS** dan **MySQL**. Hasil dari program yang dibuat adalah aplikasi web untuk pengolahan data (Simpan, Baca, Ubah, Hapus) data siswa pada suatu sekolah.

## Getting Started

1. Clone this repo ` $ git clone https://github.com/BDIDenpasarBCIC/J.620100.019.02-NodeJS-MySQL.git `
2. NPM Install ` $ npm install `
3. Add database and table

```
CREATE TABLE IF NOT EXISTS `students` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `number` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
```

4. Configure database name and password in app.js
4. Start the project ` $ npm start `

## Screenshot

![Home Page](https://github.com/BDIDenpasarBCIC/J.620100.019.02-NodeJS-MySQL/blob/master/screenshot/screenshot1.png?raw=true)