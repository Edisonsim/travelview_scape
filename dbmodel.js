var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
	id:           ObjectId,
  firstName:    { type: String, required: '{PATH} is required.' },
  lastName:     { type: String, required: '{PATH} is required.' },
  email:        { type: String, required: '{PATH} is required.', unique: true },
  password:     { type: String, required: '{PATH} is required.' },
  data:         Object
});
var User = mongoose.model('User', userSchema);

module.exports = User;
