var mongoose = require('mongoose');
var federation = require('./federation.model');

module.exports = function(){
	return{
		getAll: function(req, res){
			federation.find({}).exec(function(err, federations){
				if(err){
					res.send(err);
					console.log('could not find federations')
				}
				res.json(federations);
			});
		},
		create: function(req, res){
			var newfederation = new federation(req.body);

			newfederation.save(function(err){
				if(err){console.log('could not create federation'); res.send(err)}
				res.json(req.body);
			});
		},
		getOne: function(req, res){
			federation.findById(req.params.id, function(err, federation){
				if(err){console.log('could not find that federation'); res.send(err)}
				res.json(federation);
			})
		},
		update: function(req, res){}
	};

};