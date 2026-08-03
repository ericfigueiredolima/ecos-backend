const express = require('express');
const router = express.Router();
const projectEmployeeController = require('../controllers/projectEmployeeController');

router.get('/project-employees', projectEmployeeController.getLinks);
router.post('/project-employees', projectEmployeeController.link);
router.delete('/project-employees', projectEmployeeController.unlink);

module.exports = router;