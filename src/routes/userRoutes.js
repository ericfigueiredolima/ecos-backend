const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsuarios);
router.post('/users', userController.createUsuario);

module.exports = router;