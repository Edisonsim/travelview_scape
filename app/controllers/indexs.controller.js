var User = require('mongoose').model('User');
var mongoose = require('mongoose');

  function getIndexPage(req, res) {
      var login = (req.user) ? true : false;
      res.render('index/index', {
          login: login
      });
  }

  function getIndexContact(req, res) {
      var login = (req.user) ? true : false;
      res.render('index/contact', {
          login: login
      });
  }

  // return router;


module.exports = {
  getIndexPage: getIndexPage,
  getIndexContact: getIndexContact

}
