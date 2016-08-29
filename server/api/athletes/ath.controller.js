'use strict';
var mongoose = require('mongoose');
var athlete = require('./ath.model');
var youthumb = require('youtube-thumbnails');

module.exports = function(){
	return{
		getByUserName: function(req, res){
			athlete.find({'username':req.params.id}).exec(function(err, athlete){
				if(err){
					console.log(err);
					res.json(err);
				}else{
					console.log('found athlete');
					res.redirect('/#!/athlete/' + athlete._id);
				}
			});
		},
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
		deleteOne: function(req, res){
			console.log('deleting athlete');
			athlete.findByIdAndRemove(req.params.id, function(err, athlete){
				if(err){
					console.log('could not delete that athlete');
					res.json(athle);

				}else{
					console.log('success deleted that athlete')
					res.json({message: 'Could not delete that athlete'})
				}
			})
		},
		addRecord: function(req, res){
			console.log('adding record into athlete');
			console.log(req.body);
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
			console.log(req.body)
			function matchYoutubeUrl(url){
				var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
				console.log('looking up id for' + url)
				 return (url.match(p)) ? RegExp.$1 : false ;
				}
			var videoId = matchYoutubeUrl(req.body.link);
			console.log(videoId)
			console.log('going now to add video into athlete')
			athlete.findByIdAndUpdate(req.params.id,
				{ $push: {'videos':  {'link' : req.body.link, 'thumb': req.body.thumb, 'id': videoId} } }, 
				{new: true, safe: true, upsert: true}, 
				function(err, athlete){
					if(err){console.log('could not add video'); res.json(err)}
					else{
						console.log('success with adding the video');
						console.log(athlete);
						res.json(athlete)
					}
				})
		},
		deleveVideo : function(req, res){
			console.log('about to delete this video');
			athlete.findByIdAndUpdate(req.params.id, 
				{$pull : { 'videos' : {'_id': req.params.videoId} } }, 
				{new: true, safe: true}, 
				function(err, athlete){
					if(err){
						console.log(err);
						console.log('could not delete this athletes video')
					}else{
						console.log('successfully deleted this athletes video');
						res.json({'message':'Video deleted'})
					}
				});
		},
		addGallery: function(req, res){
			console.log('creating album for this athlete');
			console.log(req.body);
			console.log(req.body.images);
			athlete.findByIdAndUpdate(req.body.athlete, { $push: {'galleries': req.body} }, 
				{new: true, safe: true, upsert: true}, 
				function(err, athlete){
					if(err){console.log('could not create album'); console.log(err); res.json(err)}
					else{console.log('successfully added album to athlete'); console.log(athlete); res.json(athlete)}
				})
		},
		deleteGallery: function(req, res){
			console.log('deleting this gallery');
			athlete.findByIdAndUpdate(req.params.id, 
				{$pull: {'galleries': {'_id' : req.params.galId}}}, 
				{new: true, safe: true}, 
				function(err, athlete){
				if(!err){
					console.log('successfully deleted this album')
					res.json(athlete);
				}else{
					console.log(err);
					console.log('could not delete album')
				}
			});
		},
		addToAlbum: function(req,res){
			console.log('adding Pictures to this album');
			console.log(req.body)
			athlete.update({_id: req.params.id, 'galleries': {'$elemMatch' : {'_id': req.params.galId}}}, 
				{$addToSet : { 'galleries.$.images' : {$each  : req.body}}},
				{new: true, safe: true, upsert: true},
				function(err,athlete){
					if(err){
						console.log('could not find athlete');
						console.log(err);
						res.json(err);
					}else{
						console.log('success update');					
						res.json(athlete)
					}
			});
		},
		deleteFromAlbum: function(req,res){
			console.log('about to delete images from this album');
			console.log(req.body);
			athlete.update({_id: req.params.id, 'galleries': {'$elemMatch' : {'_id': req.params.galId}}}, 
				{$pull: {
					'galleries.$.images': { 'url' : req.body.url}
					}
				}, 
				{new:true, safe: true}, 
				function(err, athlete){
					if(err){
						console.log('could not delete pictures from this album');
						console.log(err);
					}else{
						console.log('great success');
						
					}
			});
		},
		updateAlbum: function(req,res){
			console.log('about to update this album');
			console.log(req.body);
			athlete.update({_id: req.params.id, 'galleries': {'$elemMatch' : {'_id': req.params.galId}}},
				{$set : { 'galleries.$' : {
						'_id': req.body._id,
						'galleryName' : req.body.galleryName, 
						'description': req.body.description,
						'photographerName': req.body.photographerName,
						'photographerLink': req.body.photographerLink,
						'images': req.body.images
					}
									
				}},
				{new: true, safe: true},
				function(err, athlete){
					if(err){
						console.log(err);
						console.log('could not update this album')
					}else{
						console.log('updated album')
						res.json(athlete)
					}
				})
		},
		update: function(req, res){}
	};

};