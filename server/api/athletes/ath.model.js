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

var athleteSchema = new Schema({
	dob: Date,
	competitions: [{record: {type: Schema.ObjectId, ref:'record'}}],
	profile: { type: Schema.ObjectId, ref: 'user' },
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

var autoPopulateAth = function(next){
	this.populate('competitions.record');
	this.populate('profile');
	this.populate('federation.federation');
	this.populate('_creator');
};

module.exports = mongoose.model('athlete', athleteSchema);