module.exports = function(app) {
var express = require('express');
var mongoose = require('mongoose');
var indexsController = require('../controllers/indexs.controller');

// var isAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.redirect('/user/login');
// };

    // // all except login
    // app.all('/', function (req, res, next) {
    //   console.log('authentication guard.');
    //   var login = (req.user) ? true : false;
    //   if (login) {
    //     return next();
    //   }
    //   res.redirect('/user/login');
    //   // next(); // pass control to the next handler
    // });

    // GET index page.
    app.route('/')
    .get(indexsController.getIndexPage)

    // GET contact page.
    app.route('/contact')
    app.get(indexsController.getIndexContact);


};
