var path = require('path');
var express = require('express');

module.exports = function(app){


	app.get('/manager*', function(req, res){
		res.render('admin');
	});

	app.get('/', function(req, res){
		res.render('index');
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
}