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
			console.log('creating record');
			console.log(req.body);
			var newRecord = new record(req.body);
			newRecord.save(function(err, record){
				if(err){
					console.log('could not create record'); 
					console.log(err); 
					res.send(err)}
				else{
					console.log('success creating record');
					res.json(record);
					}
			});
		},
		getOne: function(req, res){
			record.findById(req.params.id, function(err, record){
				if(err){console.log('could not find that record'); res.send(err)}
				res.json(record);
			})
		},
		deleteOne: function(req, res){
			console.log('requesting to delete this record')
			record.findByIdAndRemove(req.params.id, function(err, record){
				if(err){
					console.log(err);
					console.log('couldnt delete this record')
				}else{
					console.log('success deleting this record');
					res.json({'message': 'deleted record'});
				}
			});
		},
		getAthRecords: function(req, res){
			record.find({'athlete':req.params.id}).exec(function(err, records){
				console.log('looking up shows')
				if(err){ console.log(err); console.log('could not get this athletes shows')}
				else{ console.log('got the shows'); console.log(records); res.json(records)}
			})
		},
		update: function(req, res){
			record.findByIdAndUpdate(req.params.id, 
				{$set : req.body }, 
				{new: true, safe: true, upsert: true}, 
				function(err, record){
					if(err){
						console.log(err);
						console.log('could not update this record');
					}else{
						console.log('updated this record')
						res.json(record);
					}
				});
		}
	};

};