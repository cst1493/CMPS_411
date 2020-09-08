var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    name:    {type: String, required: true},
})

module.exports = mongoose.model('foodSchema', foodSchema);