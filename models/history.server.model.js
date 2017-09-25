var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('HistoryRecord', historyRecordSchema, 'history');