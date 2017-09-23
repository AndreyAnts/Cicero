'use strict';

var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore(
    {
        uri: 'mongodb://Demo:password123@ds135234.mlab.com:35234/standupsdb',
        collection: 'mySessions'
    });

// Catch errors
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});

var http = require('http');

var app = express();

var port = 3000;
app.set('port', port);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },   // 1 week
    store: store
}));

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    if(!req.session.progress)
    {
        req.session.progres = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname;

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

    next();
});

// Access the session as req.session
app.get('/', function(req, res, next) {
    if (req.session.views) {
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
        res.end();
    } else {
        req.session.views = 1;
        res.end('welcome to the session demo. refresh!');
    }
});

app.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});

app.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
});

app.get('/test', function (req, res, next) {
    req.session.progres.current = 5;
    req.session.progres.refList = [1, 2, 3, 4, 5, 6, 7];
    res.send('The size of the array: ' + req.session.progres.refList.length + ' length')
});

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

// -----------------

function selectRefList(user) {

};