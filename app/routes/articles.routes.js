module.exports = function(app) {
var express = require('express');
var path = require('path');
var multer = require('multer');
var mongoose = require('mongoose');
var articlesController = require('../controllers/articles.controller');

var filename = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/article-covers/'));
    },
    filename: function (req, file, cb) {
        filename = Date.now() + file.originalname;
        cb(null, filename);
    }
});
var upload = multer({storage: storage});

var Article = require('../models/article.model');
var Places = require('../models/place.model');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

// GET create page.
app.route('/article/create')
.get(isAuthenticated, articlesController.getCreateArticle)
.post(isAuthenticated, upload.single('image'), articlesController.postCreateArticle);

app.route('/approval')
  .get(isAuthenticated, articlesController.getPendingApproval)
  .post(isAuthenticated, articlesController.postPendingApproval)


};
