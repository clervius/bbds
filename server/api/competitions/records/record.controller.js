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

			newRecord.save(function(err, record){
				if(err){console.log('could not create record'); console.log(err); res.send(err)}
				res.json(record);
			});
		},
		getOne: function(req, res){
			record.findById(req.params.id, function(err, record){
				if(err){console.log('could not find that record'); res.send(err)}
				res.json(record);
			})
		},
		getAthRecords: function(req, res){
			record.find({'athlete':req.params.id}).exec(function(err, records){
				console.log('looking up shows')
				if(err){ console.log(err); console.log('could not get this athletes shows')}
				else{ console.log('got the shows'); console.log(records); res.json(records)}
			})
		},
		update: function(req, res){}
	};

};