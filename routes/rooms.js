const express = require('express');
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability } = require('../controllers/rooms');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/:hotelId', verifyAdmin, createRoom);
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);
router.delete('/:id/:hotelId', deleteRoom);
router.get('/:id', getRoom);
router.get('/', getAllRooms);

module.exports = router;