var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profile = new Schema({
	president: String,
	shortDescription: String,
	longDescription: String,
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

var update = new Schema({
	who: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	when: {
		type: Date,
		default: new Date
	}
})
var federationSchema = new Schema({
	country: String,
	federationFullName: String,
	federationShortName: String,
	coverImage: Schema.Types.Mixed,
	logo: Schema.Types.Mixed,
	createdAt: {
		type: Date,
		default: new Date
	},
	profile: profile,
	divisions: [divisionSchema],
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	updates: [update]
}, {
	toJSON: { virtuals: true}
});

module.exports = mongoose.model('federation', federationSchema);