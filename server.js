const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Tempat file HTML nanti

// API Ambil Semua Obat
app.get('/api/obat', (req, res) => {
    db.all("SELECT * FROM obat", [], (err, rows) => {
        res.json(rows);
    });
});

// API Tambah Transaksi & Kurangi Stok
app.post('/api/transaksi', (req, res) => {
    const { total, items } = req.body;
    db.run("INSERT INTO transaksi (total_harga) VALUES (?)", [total], function(err) {
        const transaksiId = this.lastID;
        items.forEach(item => {
            db.run("UPDATE obat SET stok = stok - ? WHERE id = ?", [item.qty, item.id]);
        });
        res.json({ success: true, id: transaksiId });
    });
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

// Tambahkan di dalam server.js

// API Ambil Laporan Penjualan
app.get('/api/laporan', (req, res) => {
    const query = `
        SELECT t.id, t.tanggal, t.total_harga, 
        GROUP_CONCAT(o.nama || ' (' || dt.qty || ')') as detail_obat
        FROM transaksi t
        JOIN detail_transaksi dt ON t.id = dt.transaksi_id
        JOIN obat o ON dt.obat_id = o.id
        GROUP BY t.id ORDER BY t.tanggal DESC
    `;
    db.all(query, [], (err, rows) => {
        res.json(rows);
    });
});

// Pastikan database.js Anda memiliki tabel detail_transaksi untuk record yang lebih rapi
