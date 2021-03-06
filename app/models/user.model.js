var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
  firstName:    { type: String },
  lastName:     { type: String },
  email:        { type: String, unique: true },
  password:     { type: String },
  admin:        { type: Boolean, default: false }
});

userSchema.statics.encrypt = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
