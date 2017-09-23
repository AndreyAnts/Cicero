'use strict';

var Person = require('../models/aircraft.server.model');

exports.create = function() {
    var entry = new Person({
        actualCode: "Robert",
        advisedCode: "Fello",
        testValue: [
            {
                id1: "test1",
                id2: 50
            },
            {
                id1: "test2",
                id2: 40
            },
            {
                id1: "test3",
                id2: 30
            }
        ]
    });

    entry.save(function (err) {
        if (err) {
            // return handleError(err);
            console.log("Error: " + err.toString());
        }
        else {
            console.log('No error');
        }
    }).then(function(){
        console.log('Then executed.....');
    });
};

exports.disconnectDb = function(){
    require('mongoose').disconnect();
};