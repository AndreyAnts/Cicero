
// Connect to MongoDB with Mongoose 4.11.x (tested with both mLab single instance and MongoDB Atlas replica set):

const mongoose = require('mongoose');

// const uriString = 'mongodb://<Admin>:<Admin>@ds135234.mlab.com:35234/standupsdb';
const uriString = 'mongodb://Demo:password123@ds135234.mlab.com:35234/standupsdb';

mongoose.Promise = global.Promise;

const options = {
    promiseLibrary: global.Promise,
    useMongoClient: true
};

function connectAsync () {
    return new Promise(function (resolve, reject) {
        mongoose.connect(uriString, options)
            .then(function() {
                const admin = new mongoose.mongo.Admin(mongoose.connection.db);
                admin.buildInfo(function(err, info) {
                    if (err) {
                        return reject('Error getting MongoDB info: ${err}' + err);
                    } else {
                        console.log('Connection to MongoDB (version ${info.version}) opened successfully! ' + info.version);
                        resolve();
                    }
                });
            })
            .catch(function(err) {
                return reject('Error connecting to MongoDB:' + err);
            });
    });
}

/*
function connect(){
    // connectAsync().then(console.log, console.error);
    console.log('COnnecr log ....');
};
*/


function connect() {
    mongoose.connect(uriString, options)
        .then(function() {
            const admin = new mongoose.mongo.Admin(mongoose.connection.db);
            admin.buildInfo(function(err, info) {
                if (err) {
                    console.err('Error getting MongoDB info: ${err}');
                } else {
                    console.log('Connection to MongoDB (version ${info.version}) opened successfully! ' + info.version);
                }
            });
        })
        .catch(function(err) {
            console.error('Error connecting to MongoDB: ${err}');
            console.error((err));
        });
};

module.exports = connectAsync;