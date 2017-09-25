'use strict';

var express = require('express');
var router = express.Router();

var etextCtrl = require('../controllers/echotext.server.controller');

// Get a new Echo Text item...
router.get('/new', function (req, res, next) {
    return etextCtrl.getNewForm(req, res, next);
});

// Post a new Echo Text item...
router.post('/new', function (req, res, next) {
    return etextCtrl.create(req, res);
});

// Get a list of Echo Text items...
router.get('/list', function (req, res, next) {
    console.log('Controller etext - list');
    return etextCtrl.list(req, res, next);
});

router.post('/submit', function (req, res, next) {
    return etextCtrl.submit(req, res, next);
});

router.post('/verify', function (req, res, next) {
    return etextCtrl.verify(req, res, next);
});

router.post('/history', function (req, res, next) {
    return etextCtrl.showHistory(req, res, next);
})

// Export router...
module.exports = router;