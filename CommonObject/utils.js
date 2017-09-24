'use strict';
var mongoose = require('mongoose');

var User = require('../models/user.server.model');
var HistoryRecord = require('../models/history.server.model');

exports.saveHistory = function( originalId, enteredText, numOfErrors ){
    var entry = new HistoryRecord({
        ActionedBy: "59c6edcb7eb6668b185e7af7",
        ActionedOn: Date.now(),
        ActionedFor: originalId,
        Body: enteredText,
        IsSuccess: (numOfErrors === 0),
        NumOfErrors: numOfErrors
    });

    entry.save(function (err) {
            if (err) {
                var errMsg = 'Sorry, there was an error saving a new History Record item. ' + err;
                console.error(errMsg);
            }
            else {
                console.log('History Record item was saved!');
            }
            })
        .then(null, console.error);
};

exports.saveUser = function saveUser( user ) {
    var entry = new User({
       firstName: user.firstName,
       lastName: user.lastName,
       login: user.login,
       passwordHash: user.passwordHash
    });

    entry.save(function (err) {
        if (err) {
            var errMsg = 'Sorry, there was an error saving a new User item. ' + err;
            console.error(errMsg);
        }
        else {
            console.log('User item was saved!');
        }
    })
        .then(null, console.error);
};

exports.checkText = function checkText(one, other){
    var diff = require('diff').diffWords(one, other);

    console.log(diff);

    var result = {};
    result.diff = diff;
    result.errors = diff.filter(function(x){
        return (x.added || x.removed);
    }).length;

    if( result.errors === 0 ){
        result.message = 'No errors. Well done!';
    }
    else if( result.errors === 1){
        result.message = '1 error discovered.';
    }
    else {
        result.message = 'There are ' + result.errors + 'errors discovered.'
    }

    return result;
};