var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

var routes = function(passport){

  // GET index page.
  router.get('/', function(req, res) {
    res.render('index.ejs');
  });

  //GET login page
  router.get('/login', function(req, res){
    console.log('login');
    res.render('login.ejs', { error: req.flash('loginError') });
  });

  //Handle login POST
  router.post('/login', passport.authenticate('login',{
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // GET registration page
  router.get('/register', function(req, res){
    res.render('register.ejs', { error: req.flash('registerError') });
  });

  // Handle registration POST
  router.post('/register', passport.authenticate('register', {
    successRedirect: '/dashboard',
    failureRedirect: '/register',
    failureFlash: true
  }));


  // GET dashboard page
  router.get('/dashboard', isAuthenticated, function(req, res){
    res.render('dashboard.ejs', { user: req.user });
  });

  /* Handle Logout */
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;

};

module.exports = routes;
