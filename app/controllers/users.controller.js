var passport = require('passport');

function getLoginRegisterPage(req, res) {
  res.render('user/loginRegister');
}
  function getLogin(req, res) {
    console.log('login');
    res.render('user/login', { error: req.flash('loginError') }
  )}

  function postLogin(req, res) {
    var loginStrategy = passport.authenticate('local-login',{
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    });
    return loginStrategy(req, res);
  }

  function register(req, res){
    res.render('user/register', { error: req.flash('registerError')
  });
  }

  function postRegister(req, res) {
    console.log("entered the post register controller");
    var registerStrategy = passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/register',
      failureFlash: true
    })
    return registerStrategy(req, res);
  }

  function dashboard(req, res){
    res.render('user/dashboard', { user: req.user });
  }

  function logout(req, res) {
    req.logout();
    res.redirect('/login');
  }

module.exports = {
  getLoginRegisterPage: getLoginRegisterPage,
  getLogin: getLogin,
  postLogin: postLogin,
  register: register,
  postRegister: postRegister,
  dashboard: dashboard,
  logout: logout
}
