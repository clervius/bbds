var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var record = require('../records/record.model')

var location = new Schema({
	venue: String,
	country: String,
	Address: String,
	City: String,
	State: String,
	Zip: String
});

var schowSchema = new Schema({
	year: Number,
	date: Date,
	createdAt: { type: Date, default: Date.now },
	location: location,
	records: [record],
	federation: { type: Schema.ObjectId, ref: 'federation' }
});