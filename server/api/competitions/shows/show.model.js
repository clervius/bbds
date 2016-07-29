var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var record = require('../records/record.model');
var division = require('../federations/divisions/division.model');

var classSchema = new Schema({
	records: [{record: {type: Schema.ObjectId}}],
	className: String,
	description: String
});

var showSchema = new Schema({
	year: Number,
	date: Date,
	createdAt: { type: Date, default: Date.now },
	location: {
		venue: String,
		country: String,
		Address: String,
		City: String,
		State: String,
		Zip: String
	},
	federation: { type: Schema.ObjectId, ref: 'federation' },
	divisions: [ { division: { type: Schema.ObjectId, ref: 'division' }, classes: [classSchema] } ],
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	}
}, {
	toJSON: { virtuals: true}
});

var autoPopulateShow = function(next){
	this.populate('federation');
	this.populate('divisions.division');
	this.populate('divisions.classes.records.record');
	this.populate('_creator');
};

showSchema.pre('findOne', autoPopulateShow).pre('find', autoPopulateShow);

module.exports = mongoose.model('show', showSchema);
