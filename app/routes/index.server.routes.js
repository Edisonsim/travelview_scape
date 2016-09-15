module.exports = function(app) {
var express = require('express');
var mongoose = require('mongoose');
var indexsController = require('../controllers/indexs.controller');

    // GET index page.
    app.route('/')
    .get(indexsController.getIndexPage);

    // GET contact page.
    app.route('/contact')
    .get(indexsController.getIndexContact);


};
