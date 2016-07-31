var mongoose = require('mongoose');
var show = require('./show.model');

module.exports = function(){
	return{
		getAll: function(req, res){
			show.find({}).exec(function(err, shows){
				if(err){
					res.send(err);
					console.log('could not find shows')
				}
				res.json(shows);
			});
		},
		create: function(req, res){
			var newshow = new show(req.body);

			newshow.save(function(err){
				if(err){console.log('could not create show'); res.send(err)}
				res.json(req.body);
			});
		},
		getOne: function(req, res){
			show.findById(req.params.id, function(err, show){
				if(err){console.log('could not find that show'); res.send(err)}
				res.json(show);
			})
		},
		update: function(req, res){}
	};

};