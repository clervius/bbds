var path = require('path');
var express = require('express');

module.exports = function(app){

	//API routes
	app.get('/ath/*', require('../api/athletes'));
	app.post('/ath/*', require('../api/athletes'));
	app.get('/record/*', require('../api/competitions/records'));
	app.post('/record/*', require('../api/competitions/records'));
	app.get('/show/*', require('../api/competitions/shows'));
	app.post('/show/*', require('../api/competitions/shows'));
	app.get('/federation/*', require('../api/federations'));
	app.post('/federation/*', require('../api/federations'));
}