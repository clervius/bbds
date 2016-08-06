var express = require('express');
	stylus = require('stylus');
	logger = require('morgan');
	compression = require('compression');
	errorHandler = require('errorhandler');
	path = require('path');
	methodOverride = require('method-override')
	bodyParser = require('body-parser');
	cookieParser = require('cookie-parser');
	session = require('express-session');
	passport = require('passport');
	config = require('./config');
	prerender = require('prerender-node');

module.exports = function(app, config){

	function compile(str, path){
		return stylus(str).set('filename', path);
	}

	app.set('views', config.rootPath + '/server/view');
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(methodOverride());
	app.use(session({
		secret: config.secrets.session,
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware({
		src: config.rootPath + '/public',
		compile: compile
	}));
	
	app.use(express.static(config.rootPath + '/public'));
	app.use(prerender);
	app.locals.moment = require('moment');
}