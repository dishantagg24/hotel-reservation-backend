const express = require('express');
const { AddHotel, UpdateHotel, DeleteHotel, GetHotel, GetAllHotels } = require('../controllers/hotels');
const router = express.Router();

router.post('/', AddHotel);
router.put('/:id', UpdateHotel);
router.delete('/:id', DeleteHotel);
router.get('/:id', GetHotel);
router.get('/', GetAllHotels);

module.exports = router;