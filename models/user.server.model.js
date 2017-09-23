var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   firstName: { type: String, isRequired: true },
   lastName: {type: String, isRequired: true},
   login: String,
   passwordHash: String,
   history: [{type: Schema.Types.ObjectId, ref: 'HistoryRecord'}]
});

// Export model...
module.exports = mongoose.model('User', userSchema, 'userinfo' );
