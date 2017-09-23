'use strict';

var Echotext = require('../models/echotext.server.model');

function list(req, res){
    var query = Echotext.find();

    query.sort({eOrder: 'ascending'})
        .limit(12)
        .exec(function(err, results){
            if(err){
                console.error('ERROR on List() ' + err);
                return;
            }

            res.render('./etext/etext-list', {title:'EchoText items - List', items: results}
            );
    });
};

function getNewForm(req, res) {
  return res.render('./etext/etext-new', {title: 'Create a new Echo Text item'} );
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
            res.render('newnote', { title: 'Echo Text - New Item (error)', message: errMsg });
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
    query.exec(function(err, results){
            if(err){
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
    query.exec(function(err, results){
        if(err){
            console.error('ERROR on findBiId() ' + err);
            return;
        }
        else {
            var test = checkText(results.eText, req.body.eText);
            return res.render('./etext/etext-verify', {title: "Let's verify this item", item: results, test: test});
        }
    });
};

function checkText(one, other){
    var diff = require('diff').diffChars(one, other);

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
}

// Module exports...
module.exports.list = list;
module.exports.create = create;
module.exports.getNewForm = getNewForm;
module.exports.submit = submit;
module.exports.verify = verify;