'use strict';
var mongoose = require('mongoose');
var athlete = require('../athletes/ath.model');
var post = require('../editorials/editorial.model');
var record = require('../competitions/records/record.model')

module.exports = function(){
	var allAthletes,allPosts;
	var getUsuals = function(){
		// start
		post.find().exec((err,posts)=>{ 
				if(!err){ 
					console.log('found all posts'); 
					allPosts = posts; 
					athlete.find().exec((err,athletes)=>{ 
						if(!err){ 
							console.log('found all athletes'); 
							allAthletes = athletes; 
						}else{ 
							console.log('Did not find athletes'); 
						} 
					});
				}else{ 
					console.log('Did not find posts'); 
				} 
			});
		// end
	}
	return {
		homePage: function(req, res){
			console.log('get home page');
			// Start
			post.find().exec((err,posts)=>{ 
				if(!err){ 
					console.log('found all posts'); 
					allPosts = posts; 
					athlete.find().exec((err,athletes)=>{ 
						if(!err){ 
							console.log('found all athletes'); 
							allAthletes = athletes; 
							res.render('material/index', {athletes:allAthletes, posts:allPosts});
						}else{ 
							console.log('Did not find athletes'); 
						} 
					});
				}else{ 
					console.log('Did not find posts'); 
				} 
			});
			// End
			
		},
		athletes: function(req, res){
			console.log('get athletes page');
			// Start
			post.find().exec((err,posts)=>{ 
				if(!err){ 
					console.log('found all posts'); 
					allPosts = posts; 
					athlete.find().exec((err,athletes)=>{ 
						if(!err){ 
							console.log('found all athletes'); 
							allAthletes = athletes; 
							res.render('material/allAthletes', {athletes:allAthletes, posts:allPosts});
						}else{ 
							console.log('Did not find athletes'); 
						} 
					});
				}else{ 
					console.log('Did not find posts'); 
				} 
			});
			// End
			
		},
		posts: function(req, res){
			console.log('get posts');
			// Start
			post.find().exec((err,posts)=>{ 
				if(!err){ 
					console.log('found all posts'); 
					allPosts = posts; 
					athlete.find().exec((err,athletes)=>{ 
						if(!err){ 
							console.log('found all athletes'); 
							allAthletes = athletes; 
							res.render('material/allPosts', {athletes:allAthletes, posts:allPosts});
						}else{ 
							console.log('Did not find athletes'); 
						} 
					});
				}else{ 
					console.log('Did not find posts'); 
				} 
			});
		},
		getOneAthlete: function(req, res){
			console.log('get one athlete');
			var shows ;
			athlete.findById(req.params.id, function(err, person){
				if(!err){
					record.find({'athlete':req.params.id}).exec(function(err, records){
						console.log('looking up shows')
						if(err){ console.log(err); console.log('could not get this athletes shows')}
						else{ 
							console.log('got the shows'); 
							// Start
							post.find().exec((err,posts)=>{ 
								if(!err){ 
									console.log('found all posts'); 
									allPosts = posts; 
									athlete.find().exec((err,athletes)=>{ 
										if(!err){ 
											console.log('found all athletes'); 
											allAthletes = athletes; 
											res.render('material/oneAth', {athletes:allAthletes, posts:allPosts, athlete:person, records: records});
										}else{ 
											console.log('Did not find athletes'); 
										} 
									});
								}else{ 
									console.log('Did not find posts'); 
								} 
							});
							// End
							
						 }
					})
					
				}else{
					console.log('couldnt get one athlete');
					res.redirect('/');
				}
			})
		},
		AthleteGallery: function(req, res){
			console.log('getting ath album');
			athlete.findById(req.params.id, function(err,athlete){
				if(!err){
					console.log('found athlete')
					athlete.galleries.forEach((gallery)=>{
						if(gallery._id == req.params.galId){
							console.log('found album');
							res.render('material/album', {athlete:athlete, gallery:gallery, athletes:allAthletes, posts:allPosts});
						}else{
							console.log('wrong album');
						}
					})
				}else{
					console.log('could not find that athlete');
				}
			})
		},
		getOnePost: function(req, res){
			console.log('getting one post');
			post.findById(req.params.id, (err,article)=>{
				if(!err){
					console.log('found the post');
					// Start
					post.find().exec((err,posts)=>{ 
						if(!err){ 
							console.log('found all posts'); 
							allPosts = posts; 
							athlete.find().exec((err,athletes)=>{ 
								if(!err){ 
									console.log('found all athletes'); 
									allAthletes = athletes; 
									res.render('material/onePost', {post:article, athletes:allAthletes, posts:allPosts});
								}else{ 
									console.log('Did not find athletes'); 
								} 
							});
						}else{ 
							console.log('Did not find posts'); 
						} 
					});
					// End
					
				}else{
					console.log('could not find the post');
					res.redirect('/front');
				}
			});
		}
	}
};