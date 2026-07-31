const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/usuarios', userController.getUsuarios);
router.post('/usuarios', userController.createUsuario);

module.exports = router;