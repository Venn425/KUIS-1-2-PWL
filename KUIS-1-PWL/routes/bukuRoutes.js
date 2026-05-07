const express = require('express');
const router = express.Router();
const { getAllBuku, getBukuById, createBuku, updateBuku, deleteBuku } = require('../controllers/bukuController');

router.route('/').get(getAllBuku).post(createBuku);
router.route('/:id').get(getBukuById).put(updateBuku).delete(deleteBuku);

module.exports = router;