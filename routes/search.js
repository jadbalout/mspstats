var express = require('express');
var router = express.Router();


// Require our controllers.
var searchController = require('../controllers/searchController');
router.get('/:region/:username', searchController.searchUserByRegion);
//router.post('/', searchController.searchUserByRegion);
module.exports = router;
