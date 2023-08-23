const express = require('express');
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } = require('../controllers/rooms');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/:hotelId', verifyAdmin, createRoom);
router.put('/:id', verifyAdmin, updateRoom);
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);
router.get('/:id', getRoom);
router.get('/', getAllRooms);

module.exports = router;