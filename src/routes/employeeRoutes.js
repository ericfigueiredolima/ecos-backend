const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/employees', employeeController.getEmployees);
router.post('/employees', employeeController.createEmployee);

module.exports = router;