const express = require('express');
const { AddHotel, UpdateHotel, DeleteHotel, GetHotel, GetAllHotels, CountByCity, CountByType, GetHotelRooms } = require('../controllers/hotels');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/', verifyAdmin, AddHotel);
router.put('/:id', verifyAdmin, UpdateHotel);
router.delete('/:id', DeleteHotel);
router.get('/find/:id', GetHotel);
router.get('/countByCity', CountByCity);
router.get('/countByType', CountByType);
router.get('/', GetAllHotels);
router.get('/room/:id', GetHotelRooms);

module.exports = router;