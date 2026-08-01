const express = require('express');
const router = express.Router();
const projectEmployeeController = require('../controllers/projectEmployeeController');

router.get('/project-employees', projectEmployeeController.getAssociacoes);
router.post('/project-employees', projectEmployeeController.createAssociacao);

module.exports = router;