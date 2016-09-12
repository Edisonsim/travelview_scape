module.exports = function(app) {
var express = require('express');
var passport = require('passport');
var usersController = require('../controllers/users.controller');


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

  // GET index page.
  // app.route('/')
  // .get(staticController.index);
  //
  // function(req, res) {
  //   res.render('index.ejs');
  // });

  app.route('/login')
    .get(usersController.getLogin)
    .post(usersController.postLogin);

  // GET registration page
  app.route('/register')
  .get(usersController.register)
    .post(usersController.postRegister);

  // GET dashboard page
  app.route('/dashboard')
  .get(usersController.dashboard)

  /* Handle Logout */
  app.route('/logout')
  .get(usersController.logout)

  };
