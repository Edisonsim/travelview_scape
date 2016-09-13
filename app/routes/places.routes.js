module.exports = function(app) {
  var express = require('express');
  var Places = require('../models/Places');
  var Article = require('../models/Article');
  var mongoose = require('mongoose');

  var placesController = require('../controllers/places.controller');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/user/login');
};

var routes = function (passport) {

    // GET create page.
    app.route('/create')
    .get(isAuthenticated,
    placesController.createPlace);

    app.post('/create', isAuthenticated,
  placesController.postPlace);

}

};
