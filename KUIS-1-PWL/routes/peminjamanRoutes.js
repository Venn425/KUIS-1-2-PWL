const express = require('express');
const router = express.Router();
const { getAllPeminjaman, getPeminjamanById, createPeminjaman, updatePeminjaman, deletePeminjaman } = require('../controllers/peminjamanController');

router.route('/').get(getAllPeminjaman).post(createPeminjaman);
router.route('/:id').get(getPeminjamanById).put(updatePeminjaman).delete(deletePeminjaman);

module.exports = router;