const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');


router.get('/users', authenticateToken, authorizeRole(1), userController.getAllUsers);
router.delete('/users/:id',  userController.deleteUser);
router.get('/users/:id',  userController.getUserById);

module.exports = router;