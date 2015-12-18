'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var seed = require('../seed'); //seed 50 users in 5 groups
var userData = seed(20, 500);
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.set('userdata', userData);

app.get('/', routes.index);
app.get('/users', routes.users);
app.get('/users/:userIndex', routes.user);
app.get('/groups', routes.groups);
app.get('/groups/:groupIndex', routes.group);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
