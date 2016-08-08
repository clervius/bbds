'use strict';
var mongoose = require('mongoose');
var athlete = require('./ath.model');
var ogs = require('open-graph-scraper');
var Metascraper = require('metascraper')

module.exports = function(){
	return{
		getAll: function(req, res){
			athlete.find({}).exec(function(err, athletes){
				if(err){
					res.send(err);
					console.log('could not find athletes')
				}
				res.json(athletes);
			});
		},
		create: function(req, res){

			console.log(req.body);
			var newAthlete = new athlete(req.body);
			newAthlete.save(function(err, athlete){
				if(err){console.log('could not create athlete'); res.send(err)}
				else{ console.log('created new athlete'); console.log(athlete); res.json(athlete);}				
			});
		},
		getOne: function(req, res){
			athlete.findById(req.params.id, function(err, athlete){
				if(err){console.log('could not find that athlete'); res.send(err)}
				console.log('looking up athlete');
				
				res.json(athlete);
			})
		},
		addRecord: function(req, res){
			console.log('adding record into athlete')
			athlete.findByIdAndUpdate(req.body.athlete, 
				{ $push: { 'competitions' : { 'record' : req.body._id} } }, 
				{new: true, safe:true, upsert: true}, 
				function(err, athlete){
				if(err){console.log('could not add record'); res.json(err)}
				else{
					console.log('successfully added record to athlete');
					console.log(athlete);
					res.json(athlete);
				}
			})
		},
		update: function(req, res){}
	};

};