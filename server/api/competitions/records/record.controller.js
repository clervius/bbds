var mongoose = require('mongoose');
var record = require('./record.model');

module.exports = function(){
	return{
		getAll: function(req, res){
			record.find({}).exec(function(err, records){
				if(err){
					res.send(err);
					console.log('could not find records')
				}
				res.json(records);
			});
		},
		create: function(req, res){
			var newRecord = new record(req.body);

			newRecord.save(function(err){
				if(err){console.log('could not create record'); res.send(err)}
				res.json(req.body);
			});
		},
		getOne: function(req, res){
			record.findById(req.params.id, function(err, record){
				if(err){console.log('could not find that record'); res.send(err)}
				res.json(record);
			})
		},
		update: function(req, res){}
	};

};