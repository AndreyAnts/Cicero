var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aircraftSchema = new Schema({
        actualCode: String,
        testValue: [{id1: String, id2: Number}],
        advisedCode: String,
        projects: [
            {
                title: String,
                tags: [
                    {
                        type: Schema.ObjectId,
                        ref: 'tag'
                    }
                ]
            }
        ]
});

// Export model...
module.exports = mongoose.model('Aircraft', aircraftSchema);