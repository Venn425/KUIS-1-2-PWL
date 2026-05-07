const Buku = require('../models/Buku');

exports.getAllBuku = async (req, res) => {
    const data = await Buku.find();
    res.json({ success: true, data });
};

exports.getBukuById = async (req, res) => {
    const data = await Buku.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json({ success: true, data });
};

exports.createBuku = async (req, res) => {
    const data = await Buku.create(req.body);
    res.status(201).json({ success: true, data });
};

exports.updateBuku = async (req, res) => {
    const data = await Buku.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json({ success: true, data });
};

exports.deleteBuku = async (req, res) => {
    await Buku.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Buku berhasil dihapus' });
};