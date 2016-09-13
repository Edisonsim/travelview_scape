module.exports = function(app) {
var express = require('express');
var indexsController = require('../controllers/indexs.controller');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/user/login');
};

var routes = function (passport) {

    // GET index page.
    app.route('/')
    .get(indexsController.getIndexPage)

    // GET contact page.
    app.route('/contact')
    app.get(indexsController.getIndexContact);


};
};
