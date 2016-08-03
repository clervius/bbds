var path = require('path');
var express = require('express');

module.exports = function(app, passport){


	app.get('/manager*', isLoggedIn, function(req, res){
		res.render('admin', {user: req.user});
	});
	app.get('/access', function(req, res){
		res.render('homeform');
	});
	app.get('/signup', function(req, res){
		res.render('signup');
	});
	

	
	
	app.post('/access/register', passport.authenticate('local-signup', {
		successRedirect: '/logout',
		failureRedirect: '/noauth'
	}), function(req, res){
		res.redirect('/noauth')
	});
	app.post('/access/login', passport.authenticate('local-login', {
		successRedirect: '/manager',
		failureRedirect: '/auth'
	}), function(req, res){
		res.redirect('/auth')
	});

	//API routes
	app.get('/ath/*', require('../api/athletes'));
	app.post('/ath/*', require('../api/athletes'));
	app.get('/record/*', require('../api/competitions/records'));
	app.post('/record/*', require('../api/competitions/records'));
	app.get('/show/*', require('../api/competitions/shows'));
	app.post('/show/*', require('../api/competitions/shows'));
	app.get('/federation/*', require('../api/federations'));
	app.post('/federation/*', require('../api/federations'));

	//front-end jade
	app.get('/client/*', function(req, res){
	    res.render('../../public/' + req.params[0]); 
	});

	app.get('/auth', function(req, res){
		res.render('unauthorized');
	});
	app.get('/noauth', function(req, res){
		res.render('nonewUser')
	})
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/', function(req, res){
		res.render('index');
	});
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}else{
		res.redirect('/auth');
	}
}