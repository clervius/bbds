var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profile = new Schema({
	president: String,
	yearFounded: Number,
	address: {
		street: String,
		city: String,
		state: String,
		zip: Number
	}
});

var classSchema = new Schema({
	className: String,
	description: String
});

var divisionSchema = new Schema({
	divisionName: String,
	gender: String,
	classes: [classSchema]
});


var federationSchema = new Schema({
	country: String,
	federationName: String,
	profile: profile,
	divisions: [divisionSchema],
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	}
});

