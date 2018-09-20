var express = require('express');
var router = express.Router();
var highScoreController = require('../controllers/highScoreController');
router.get('/', function(req, res) {
  
  res.redirect('movies');
});
router.get('/movies/:region?/:page?/:weekly?', highScoreController.getMoviesByRegion);
router.get('/actors/:region?/:page?/:weekly?', highScoreController.getActorsByRegion);
module.exports = router;
