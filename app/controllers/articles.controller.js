var User = require('mongoose').model('User');
var Article = require('mongoose').model('Article');
var Place = require('mongoose').model('Place');

function getCreateArticle(req, res) {
      var login = (req.user) ? true : false;
      Place.find({}, function (err, data) {
          if (err) {
              res.status(500).send(err.message);
          } else {
              res.render('article/create', {
                  places: data,
                  login: login
              });
          }
      });
  }

  function postCreateArticle(req, res) {
      var article = new Article();
      article.title = req.body.title;
      article.descriptions = req.body.descriptions;
      article.imageUrl = "/uploads/article-covers/" + filename;
      article.place = req.body.place;
      article.user = req.user._id;
      article.save(function (err) {
          if (err) {
              console.log(err);
              res.status(500).send(err.message);
          } else {
              res.redirect('/article');
          }
      });
  }

  function getPendingApproval (req, res) {
      var login = (req.user) ? true : false;
      Article.find({status: "PENDING"}, function (err, data) {
          if (err) {
              res.status(500).send(err.message);
          } else {
              res.render('article/approval', {
                  articles: data,
                  login: login
              });
          }
      });
  }

  function postPendingApproval(req, res) {
      var login = (req.user) ? true : false;
      if (req.body.status == "APPROVED" || req.body.status == "DENY") {
          Article.update({"_id": mongoose.mongo.ObjectId(req.body.id)}, {status: req.body.status}, function (err) {
              if (err) {
                  res.status(500).send(err.message);
              } else {
                  res.redirect('/article/approval')
              }
          });
      } else {
          res.status(500).send("Invalid Input!");
      }}



module.exports = {
  getCreateArticle: getCreateArticle,
  postCreateArticle: postCreateArticle,
  getPendingApproval: getPendingApproval,
  postPendingApproval: postPendingApproval
}
