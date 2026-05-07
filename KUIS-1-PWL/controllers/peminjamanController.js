const Peminjaman = require('../models/Peminjaman');
const Buku = require('../models/Buku');

exports.getAllPeminjaman = async (req, res) => {
    const data = await Peminjaman.find().populate('id_buku', 'judul author');
    res.json({ success: true, data });
};

exports.getPeminjamanById = async (req, res) => {
    const data = await Peminjaman.findById(req.params.id).populate('id_buku');
    if (!data) return res.status(404).json({ message: 'Tidak ditemukan' });
    res.json({ success: true, data });
};

exports.createPeminjaman = async (req, res) => {
    try {
        const buku = await Buku.findById(req.body.id_buku);
        if (!buku) return res.status(404).json({ message: 'Buku tidak ditemukan' });
        if (buku.stok < 1) return res.status(400).json({ message: 'Stok habis' });

        buku.stok -= 1;
        await buku.save();

        const data = await Peminjaman.create(req.body);
        res.status(201).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findById(req.params.id);
        if (!peminjaman) return res.status(404).json({ message: 'Tidak ditemukan' });

        // Jika is_return diubah true, tambah stok
        if (req.body.is_return === true && peminjaman.is_return === false) {
            const buku = await Buku.findById(peminjaman.id_buku);
            if (buku) {
                buku.stok += 1;
                await buku.save();
            }
        }

        const data = await Peminjaman.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, data });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findById(req.params.id);
        if (!peminjaman) return res.status(404).json({ message: 'Tidak ditemukan' });

        // Jika belum dikembalikan, tambah stok dulu
        if (peminjaman.is_return === false) {
            const buku = await Buku.findById(peminjaman.id_buku);
            if (buku) {
                buku.stok += 1;
                await buku.save();
            }
        }

        await Peminjaman.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Data peminjaman dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};