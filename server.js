var express = require('express');
var	mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session')

// Config vars
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];

//express setup
require('./server/config/express')(app, config);

// db setup
require('./server/config/mongoose')(config);
// routes
require('./server/config/passport')(passport);
require('./server/config/routes')(app, passport);

//server
app.listen(config.port);
console.log('Bigbodies listening on port ' + config.port + '...');