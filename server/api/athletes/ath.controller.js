'use strict';
var mongoose = require('mongoose');
var athlete = require('./ath.model');
var youthumb = require('youtube-thumbnails');

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
				if(err){console.log('could not find that athlete'); res.send(err); console.log(err)}
				else{console.log('looking up athlete');				
				res.json(athlete)}				
			})
		},
		addRecord: function(req, res){
			console.log('adding record into athlete');

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
		addVideo: function(req, res){
			console.log('adding video to this athlete');
			function matchYoutubeUrl(url){
				var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
				console.log('looking up id for' + url)
				 return (url.match(p)) ? RegExp.$1 : false ;
				}
			var videoId = matchYoutubeUrl(req.body.link);
			var saveVid = function(){
				athlete.findByIdAndUpdate(req.body.athlete,
					{ $push: {'videos':  req.body.video } }, 
					{new: true, safe: true, upsert: true}, 
					function(err, athlete){
						if(err){console.log('could not add video'); res.json(err)}
						else{
							console.log('succes with adding the video');
							console.log(athlete);
							res.json(athlete)
						}
					})
				}
			youthumb.get(videoId, 'maxres', function(err, thumbnail){
				if(err){
					saveVid()
				}
				else{
					req.body.thumbnail = thumbnail
					saveVid()
				}
			})
			
		},
		update: function(req, res){}
	};

};