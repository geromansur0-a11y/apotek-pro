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

// ... (tabel sebelumnya)
    db.run(`CREATE TABLE IF NOT EXISTS detail_transaksi (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaksi_id INTEGER,
        obat_id INTEGER,
        qty INTEGER,
        subtotal INTEGER,
        FOREIGN KEY(transaksi_id) REFERENCES transaksi(id)
    )`);
});
module.exports = db;
