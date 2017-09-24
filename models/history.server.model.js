var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historyRecordSchema = new Schema({
    ActionedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    ActionedOn: {type: Date, isRequired: true},
    ActionedFor: {type: Schema.Types.ObjectId, ref: 'Echotext'},
    Body: {type: String, isRequired: true},
    timeSpent: Number,
    IsSuccess: Boolean,
    NumOfErrors: Number
});

module.exports = mongoose.model('HistoryRecord', historyRecordSchema, 'history');