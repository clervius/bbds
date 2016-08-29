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
	images: Schema.Types.Mixed,
	photographerName: String,
	photographerLink:String,
	ceatedAt: {
		type: Date,
		default: new Date
	}
});

var video = new Schema({
	thumb: Schema.Types.Mixed,
	link: String,
	id: String,
	ceatedAt: {
		type: Date,
		default: new Date
	}
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
	dob: {
		type: Date,
		default: new Date
	},
	username: String,
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