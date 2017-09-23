'use strict';

var Standup = require('../models/standup.server.model');


exports.create = function(req, res) {
    var entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });

    // -----------------------------------
    var Aircraft = require('../models/aircraft.server.model');
    var entryTest = new Aircraft({
        actualCode: "Robert",
        advisedCode: "Fello"
    });
    entryTest.save();
    // -----------------------------------

    var query = Standup.find();

    query.sort({ createdOn: 'desc'})
        .limit(12)
        .exec(function(err, results){
            // res.render('index', {title: 'Standup - List', notes: results});
            console.log('RESULTS');
            console.log(results);
        });


    entry.save();
    // console.log(entry);
    console.log('And................');

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

    // redirect back to the home page...
    res.redirect(301, '/');
};

exports.getNote = function(req, res) {
    res.render('newnote', {title: 'Standup - New Note'});
};