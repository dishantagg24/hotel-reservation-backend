const express = require('express');
const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/user');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getUser);
router.get('/', verifyAdmin, getUsers);

module.exports = router;