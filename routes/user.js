var express = require('express');
var router = express.Router();


var userController = require('../controllers/userController');
router.get('/:region/:id', userController.getUserById);

module.exports = router;
