'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var record = require('../competitions/records/record.model');



var socialProfile = new Schema({
	service: String,
	link: String
});

var country = new Schema({
	classify: String,
	countryName: String
});

var gallery = new Schema({
	galleryName: String,
	description: String,
	images: [{image: Schema.Types.Mixed}]
});

var video = new Schema({
	videoName: String,
	description: String,
	file: String
});

var athleteProfile = new Schema({
	firstName: String,
	middleName: String,
	lastName: String,
	subtitle: String,
	picture: Schema.Types.Mixed
});

var publishing = new Schema({
	link: String,
	title: String,
	meta: Schema.Types.Mixed,
	createdAt: {
		type: Date,
		default: new Date
	}
}, {
	toJSON : { virtuals: true}
});


var athleteSchema = new Schema({
	dob: Date,
	competitions: [{record: {type: Schema.ObjectId, ref:'record'}}],
	fbId: String,
	account: { type: Schema.ObjectId, ref: 'user' },
	profile: athleteProfile,
	published: [publishing],
	countries: [country],
	social: [socialProfile],
	bio: String,
	federation: [{ federation: {type: Schema.ObjectId, ref: 'federation'} }],
	galleries: [gallery],
	videos: [video],
	createdAt: { type: Date, default: new Date },
	_creator: { type: Schema.ObjectId, ref: 'user' }
}, {
	toJSON: { virtuals: true}
});


module.exports = mongoose.model('athlete', athleteSchema);