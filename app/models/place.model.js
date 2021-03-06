var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var placeSchema = new Schema({
    address: {type: String, required: '{PATH} is required.'},
    descriptions: {type: String, required: '{PATH} is required.'},
    country: {type: String, required: '{PATH} is required.'},
    user: {type: Schema.Types.ObjectId, required: '{PATH} is required.'},
});
var Place = mongoose.model('Place', placeSchema);

module.exports = Place;
