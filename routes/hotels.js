const express = require('express');
const { AddHotel, UpdateHotel, DeleteHotel, GetHotel, GetAllHotels } = require('../controllers/hotels');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/', verifyAdmin, AddHotel);
router.put('/:id', verifyAdmin, UpdateHotel);
router.delete('/:id', verifyAdmin, DeleteHotel);
router.get('/:id', GetHotel);
router.get('/', GetAllHotels);

module.exports = router;