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

			neweditorial.save(function(err, editorial){
				if(err){console.log('could not create editorial'); res.send(err)}
				res.json(editorial);
			});
		},
		getOne: function(req, res){
			editorial.findById(req.params.id, function(err, editorial){
				if(err){console.log('could not find that editorial'); res.send(err)}
				res.json(editorial);
			})
		},
		update: function(req, res){}
	};

};