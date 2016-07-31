var mongoose = require('mongoose');
var athlete = require('./ath.model');

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
			var newAthlete = new athlete(req.body);

			newAthlete.save(function(err){
				if(err){console.log('could not create athlete'); res.send(err)}
				res.json(req.body);
			});
		},
		getOne: function(req, res){
			athlete.findById(req.params.id, function(err, athlete){
				if(err){console.log('could not find that athlete'); res.send(err)}
				res.json(athlete);
			})
		},
		update: function(req, res){}
	};

};