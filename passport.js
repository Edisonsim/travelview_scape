var User = require('./dbmodel');
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

module.exports = function(passport) {

  // Passport session setup required for persistent login sessions
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Registration
  passport.use('register', new LocalStrategy(
    { passReqToCallback : true,
      usernameField : 'email',
      passwordField : 'password'
    },
    function(req, email, password, done) {
    console.log('auth-passport registration');
      User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);
        // check to see if theres already a user with that email
        if (user) {
          console.log('This email is already taken');
          return done(null, false, req.flash('registerError', 'This email is already taken'));
        } else {
          // if there is no such email creat the new account
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);

          var newUser = new User({
            firstName:  req.body.firstName,
            lastName:   req.body.lastName,
            email:      req.body.email,
            password:   hash
          });
          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
    });
  }));

  // Login
  passport.use('login', new LocalStrategy(
    { passReqToCallback : true,
      usernameField: 'email',
      passwordField: 'password'
    },
    function(req, email, password, done) {
    console.log('auth-passport login');
      User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);
        // if no user is found, return the message
        if (!user) {
          console.log('This user doesn\'t exist');
          return done(null, false, req.flash('loginError', 'This user doesn\'t exist'));
        }
        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, user.password)) {
          console.log('Invalive password');
          return done(null, false, req.flash('loginError', 'Wrong password! Please Enter the correct password'));
        }
        // all is well, return successful user
        return done(null, user);
      });
    }
  ));

};
