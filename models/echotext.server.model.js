'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var echotextSchema = new Schema({
    eType: String,
    eTitle: String,
    eSubTitle: String,
    eOrder: Number,
    eText: { type: String, required: true },
    eHint: String,
    createdOn: {type: Date, default: Date.now, required: true},
    isActive: {type: Boolean, required: true,default: true}
});

// Export model...
module.exports = mongoose.model('Echotext', echotextSchema);