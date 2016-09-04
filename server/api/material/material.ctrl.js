'use strict';
var mongoose = require('mongoose');
var athlete = require('../athletes/ath.model');
var post = require('../editorials/editorial.model');

module.exports = function(){
	var allAthletes,allPosts;

	athlete.find().exec((err,athletes)=>{ if(!err){ console.log('found all athletes'); allAthletes = athletes; }else{ console.log('Did not find athletes'); } });
	post.find().exec((err,posts)=>{ if(!err){ console.log('found all posts'); allPosts = posts; }else{ console.log('Did not find posts'); } });

	return {
		homePage: function(req, res){
			console.log('get home page');
			res.render('material/index', {athletes:allAthletes, posts:allPosts});
		},
		athletes: function(req, res){
			console.log('get athletes page');
			res.render('material/allAthletes', {athletes:allAthletes, posts:allPosts});
		},
		posts: function(req, res){
			console.log('get posts');
			res.render('material/posts', {athletes:allAthletes, posts:allPosts});
		},
		getOneAthlete: function(req, res){
			console.log('get one athlete');
			athlete.findById(req.params.id, function(err, athlete){
				if(!err){
					res.render('material/oneAth', {athletes:allAthletes, posts:allPosts, athlete:athlete});
				}else{
					console.log('couldnt get one athlete');
					res.redirect('/');
				}
			})
		},
		getOnePost: function(req, res){
			console.log('get one post');
			
		}
	}
};