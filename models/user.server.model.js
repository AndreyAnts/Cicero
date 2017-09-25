var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: Schema.Types.ObjectId,
   firstName: { type: String, isRequired: true },
   lastName: {type: String, isRequired: true},
   login: String,
   passwordHash: String,
   history: [{type: Schema.Types.ObjectId, ref: 'HistoryRecord'}]
});

// var historyRecordSchema = new Schema({
//     _id: Schema.Types.ObjectId,
//     actionedBy: {type: Schema.Types.ObjectId, ref: 'User'},
//     actionedOn: {type: Date, isRequired: true},
//     actionedFor: {type: Schema.Types.ObjectId, ref: 'Echotext'},
//     body: {type: String, isRequired: true},
//     timeSpent: Number,
//     IsSuccess: Boolean,
//     numOfErrors: Number
// });

// Export model...
module.exports = mongoose.model('User', userSchema, 'userinfo' );

