var path = require('path');
var express = require('express');
var athController = require('../api/athletes/ath.controller');
var athlete = require('../api/athletes/ath.model');
var post = require('../api/editorials/editorial.model');

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
	}));
	app.post('/access/login', passport.authenticate('local-login', {
		successRedirect: '/manager',
		failureRedirect: '/wrongpass'
	}));


	
	//API routes
	app.get('/ath/*', require('../api/athletes'));
	app.post('/ath/*', require('../api/athletes'));
	app.delete('/ath/*', require('../api/athletes'));
	app.get('/record/*', require('../api/competitions/records'));
	app.post('/record/*', require('../api/competitions/records'));
	app.delete('/record/*', require('../api/competitions/records'));
	app.get('/show/*', require('../api/competitions/shows'));
	app.post('/show/*', require('../api/competitions/shows'));
	app.get('/federation/*', require('../api/federations'));
	app.post('/federation/*', require('../api/federations'));
	app.get('/editorial/*', require('../api/editorials'));
	app.post('/editorial/*', require('../api/editorials'));
	app.delete('/editorial/*', require('../api/editorials'));

	//front-end jade
	app.get('/client/*', function(req, res){
	    res.render('../../public/' + req.params[0]); 
	});

	app.get('/auth', function(req, res){
		res.render('unauthorized');
	});
	app.get('/noauth', function(req, res){
		res.render('nonewUser');
	});
	app.get('/wrongpass', function(req, res){
		res.render('wrongpass');
	});
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	/*
	app.get('/front', function(req, res){
		res.render('front/index');
	});*/

	app.get('/front', function(req, res){
		var athletes, posts;
		athlete.find().exec((err,competitors)=>{
			if(!err){
				athletes = competitors
				post.find().exec((err,articles)=>{
					if(!err){
						posts = articles;
						res.render('material/index', {athletes:athletes,posts:posts})
					}else{
						console.log(err);
						console.log('could not get the posts');
					}
				});
			}else{
				console.log('could not get athletes');
				console.log(err);
			}
		});
		
		
	});

	
	app.get('/', function(req, res){
		if(req.isAuthenticated()){
			res.render('front/index');
		}else{
			res.render('comingsoon');
		}
	});
};

function frontLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.render('index');
	}
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('/auth');
	}
}