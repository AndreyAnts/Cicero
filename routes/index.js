var express = require('express');
var router = express.Router();

var standupCtrl = require('../controllers/standup.server.controller');
var etextCtrl = require('../controllers/echotext.server.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET new Note page.
router.get('/newnote', function(req,res) {
  return standupCtrl.getNote(req, res);
});

// POST new Note page.
router.post('/newnote', function(req, res) {
  return standupCtrl.create(req, res);
});

// ----------------------------------------------
/*
router.get('/list', function(req, res, next) {
  return etextCtrl.list(req, res);
});

router.get('/create', function(req, res, next) {
  return etextCtrl.create(req, res);
});
*/
module.exports = router;
