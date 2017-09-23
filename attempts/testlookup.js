'use strict';

var aircraftCtrl = require('../controllers/aircraft.server.controller');

var myConnect = require('../dbConnect');

myConnect()
    .then(function () {
        aircraftCtrl.create();
        console.log('controllers/standup.server.controller - CReate() Done.');
    })
    .then(function() {
        aircraftCtrl.disconnectDb();
    })
    .then(function(){
        aircraftCtrl.create();
    })
    .then(console.log, console.error);



