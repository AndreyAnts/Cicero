'use strict';

var Utils = require('../CommonObject/utils');

var Echotext = require('../models/echotext.server.model');
var User = require('../models/user.server.model');
var HistoryRecord = require('../models/history.server.model');


function list(req, res) {
    var query = Echotext.find();

    query.sort({eOrder: 'ascending'})
        .limit(12)
        .exec(function (err, results) {
            if (err) {
                console.error('ERROR on List() ' + err);
                return;
            }

            res.render('./etext/etext-list', {title: 'EchoText items - List', items: results}
            );
        });
};

function getNewForm(req, res) {
    return res.render('./etext/etext-new', {title: 'Create a new Echo Text item'});
};

function create(req, res) {
    var entry = new Echotext({
        eTitle: req.body.eTitle,
        eSubTitle: req.body.eSubTitle,
        eType: '',
        eOrder: req.body.eOrder,
        eText: req.body.eText,
        eHint: req.body.eHint
    });

    console.log(req.body);

    entry.save(function (err) {
        if (err) {
            var errMsg = 'Sorry, there was an error saving a new Echo Text item. ' + err;
            res.render('newnote', {title: 'Echo Text - New Item (error)', message: errMsg});
        }
        else {
            console.log('Stand-up meeting note was saved!');
            // Redirect to the home page to display list of notes...
            res.redirect(301, '/etext/list');
        }
    })
        .then(null, console.error);

};

function submit(req, res) {
    var id = req.body.btnSaveNote;

    var query = Echotext.findById(id);
    query.exec(function (err, results) {
        if (err) {
            console.error('ERROR on findBiId() ' + err);
            return;
        }
        else {

            return res.render('./etext/etext-submit', {title: "Let's verify this item", item: results});
        }
    });
}

function verify(req, res) {
    var id = req.body.btnSaveNote;
    var query = Echotext.findById(id);
    query.exec(function (err, results) {
        if (err) {
            console.error('ERROR on findBiId() ' + err);
            return;
        }
        else {
            var test = Utils.checkText(results.eText, req.body.eText);
            if (req.body.mode === 'verification') {
                Utils.saveHistory(id, req.body.eText, test.errors);
            }
            return res.render('./etext/etext-verify', {title: "Let's verify this item", item: results, test: test});
        }
    });
};

function showHistory(req, res) {
    var userId = "59c6edcb7eb6668b185e7af7";
    var id = req.body.btnShowHistory;
    console.log(id);
    HistoryRecord.find({actionedBy: userId, actionedFor: id}).
        exec(function (err, results) {
        if (err) {
            console.error('ERROR on findBiId() ' + err);
            return;
        }
        else {
            console.log(results);
            return res.render('./etext/etext-history', {title: "History records", items: results});
        }
    });

    console.log()
}

// Module exports...
module.exports.list = list;
module.exports.create = create;
module.exports.getNewForm = getNewForm;
module.exports.submit = submit;
module.exports.verify = verify;
module.exports.showHistory = showHistory;