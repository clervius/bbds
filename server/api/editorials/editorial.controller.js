var mongoose = require('mongoose');
var editorial = require('./editorial.model');

module.exports = function(){
	return{
		getAll: function(req, res){
			editorial.find({}).exec(function(err, editorials){
				if(err){
					res.send(err);
					console.log('could not find editorials')
				}
				res.json(editorials);
			});
		},
		create: function(req, res){
			var neweditorial = new editorial(req.body);
			console.log(neweditorial)
			neweditorial.save(function(err, editorial){
				if(err){console.log('could not create editorial'); res.send(err)}
				else{
					console.log('created editorial');
					console.log(editorial)
					res.json(editorial);
				}
				
			});
		},
		getOne: function(req, res){
			editorial.findById(req.params.id, function(err, editorial){
				if(err){console.log('could not find that editorial'); res.send(err)}
				console.log(editorial)
				res.json(editorial);
			})
		},
		deleteOne: function(req, res){
			console.log('deleting article')
			editorial.findByIdAndRemove(req.params.id, function(err, editorial){
				if(err){
					console.log('could not find that editorial');
					res.json(err);
				}else{
					console.log('success delete that article');
					res.json({message: 'deleted that article'})
				}
			})
		},
		update: function(req, res){/*
			editorial.findById(req.params.id, (err,thisPost)=>{
				if(err){console.log('could not find this post');}
				else{
					console.log('found post, checking to see what is different');

				}
			})*/
			console.log('about to update this post')
			console.log(req.body);
			editorial.findByIdAndUpdate(req.params.id, 
				{$set: req.body	},
				{new: true, safe: true, upsert: true},
				(err,post)=>{
					if(err){console.log('could not update this post');res.json(err)}
					else{console.log(post); console.log('updated post'); res.json(post);}
				})
		}
	};

};