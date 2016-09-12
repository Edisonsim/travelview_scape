var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/user.model');
  require('../app/models/article.model');
  require('../app/models/place.model');
  return db;
};
