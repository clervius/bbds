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

var galleries = new Schema({
	galleryName: String,
	images: [{image: Schema.Types.Mixed}]
});


var athleteSchema = new Schema({
	dob: Date,
	competitions: [{record: {type: Schema.ObjectId, ref:'record'}}],
	profile: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	countries: [country],
	social: [socialProfile],
	bio: String,
	federation: {
		type: Schema.ObjectId,
		ref: 'federation'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	}
}, {
	toJSON: { virtuals: true}
});