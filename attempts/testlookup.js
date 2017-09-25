'use strict';

// var User = require('../models/user.server.model');
// var History = require('../models/history.server.model');

var myConnect = require('../dbConnect');

myConnect()
    .then(function () {
        // aircraftCtrl.create();
        // console.log('controllers/standup.server.controller - CReate() Done.');

        test();
    })
    .then(function() {
        // aircraftCtrl.disconnectDb();
        console.log('2nd then invoked...');
    })
    .then(console.log, console.error);



function test(){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    /*
    var personSchema = Schema({
        // _id: Schema.Types.ObjectId,
        name: String,
        age: Number,
        stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
    });

    var storySchema = Schema({
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        title: String,
        fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
    });

    var Story = mongoose.model('Story', storySchema);
    var Person = mongoose.model('Person', personSchema);
*/

    // var author = new Person({
    //     // _id: new mongoose.Types.ObjectId(),
    //     name: 'Ian Fleming',
    //     age: 50
    // });

    var userSchema = new Schema({
        _id: Schema.Types.ObjectId,
        firstName: { type: String, isRequired: true },
        lastName: {type: String, isRequired: true},
        login: String,
        passwordHash: String,
        history: [{type: Schema.Types.ObjectId, ref: 'HistoryRecord'}]
    });

    var historyRecordSchema = new Schema({
        _id: Schema.Types.ObjectId,
        actionedBy: {type: Schema.Types.ObjectId, ref: 'User'},
        actionedOn: {type: Date, isRequired: true},
        actionedFor: {type: Schema.Types.ObjectId, ref: 'Echotext'},
        body: {type: String, isRequired: true},
        timeSpent: Number,
        isSuccess: Boolean,
        numOfErrors: Number
    });

    var User = mongoose.model('User', userSchema, 'userinfo' );
    var History = mongoose.model('HistoryRecord', historyRecordSchema, 'history');

/*
    User.
    findOne({ firstName: 'Andrey' }).
    populate('history').
    exec(function (err, user) {
        if (err) return handleError(err);
        console.log('The result is ', user);
    });

    Story.
    findOne({ title: 'Casino Royale' }).
    populate('author').
    exec(function (err, story) {
        if (err) return handleError(err);
        console.log('The author is ', story);
    });

    History.findById("59c6fe8f33bcbf301c39d991").
    populate('actionedBy').
    exec(function (err, rest) {
        if (err) return handleError(err);
        console.log('The result is ==> ', rest);
    });
*/

    User.
    findOne({ firstName: 'Andrey' }).
    populate({
        path: 'history'}).
        exec(function (err, user) {
        if (err) return handleError(err);
        console.log('The result is ', user);
    });

   /* author.save(function (err) {
        console.log('Error -' + err);
        if (err) {
            console.log(err);
            return;
        }
        console.log('Author is saved');

        var story1 = new Story({
            title: 'Casino Royale',
            author: author._id    // assign the _id from the person
        });

        story1.save(function (err) {
            if (err) return handleError(err);
            // thats it!

            console.log('Story is saved');

            Story.
            findOne({ title: 'Casino Royale' }).
            populate('author').
            exec(function (err, story) {
                if (err) return handleError(err);
                console.log('The author is ', story.author.name);
                // prints "The author is Ian Fleming"
            });
        });
    });*/

    ///


}



