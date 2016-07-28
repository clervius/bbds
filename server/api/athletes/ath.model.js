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
var athleteSchema = new Schema({
	competitions: [record],
	profile: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	bio: String,
	records: [record],
});