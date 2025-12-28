const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./apotek.db');

db.serialize(() => {
    // Tabel Obat
    db.run(`CREATE TABLE IF NOT EXISTS obat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT,
        kategori TEXT,
        harga INTEGER,
        stok INTEGER,
        expired_date DATE
    )`);

    // Tabel Transaksi
    db.run(`CREATE TABLE IF NOT EXISTS transaksi (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_harga INTEGER
    )`);
});

module.exports = db;
