var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var articleSchema = new Schema({
    id: ObjectId,
    title: {type: String, required: '{PATH} is required.'},
    descriptions: {type: String, required: '{PATH} is required.'},
    imageUrl: {type: String, required: '{PATH} is required.'},
    place: {type: Schema.Types.ObjectId, required: '{PATH} is required.'},
    status: {type: String, default: 'PENDING'},
    user: {type: Schema.Types.ObjectId, required: '{PATH} is required.'},
    data: Object
});
var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
