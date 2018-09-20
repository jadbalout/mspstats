var express = require('express');
var router = express.Router();
// GET home page.
router.get('/', function(req, res) {
  
  res.render('index', { title: req.i18n.__('MainPageTitle'), locale: req.i18n.getLocale(), doSwal: (req.param('swal') != undefined || req.body.swal != undefined)});
});
router.get('/tr', function(req, res) {
  res.cookie('mspstats_lang' , 'tr', {expire : new Date() + 9999});
  res.redirect('/');
});
router.get('/en', function(req, res) {
  res.cookie('mspstats_lang' , 'en', {expire : new Date() + 9999});
  res.redirect('/');
});
module.exports = router;
