const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');


router.get('/', authenticateToken, authorizeRole(1), adminController.getAllPatient);

module.exports = router;