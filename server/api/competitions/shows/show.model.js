var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
	year: Number,
	date: Date,
	createdAt: { type: Date, default: new Date },
	description: String,
	location: {
		venue: String,
		country: String,
		Address: String,
		City: String,
		State: String,
		Zip: String
	},
	federation: { type: Schema.ObjectId, ref: 'federation' },
	divisions: [
		{
			division: {
				divisionName: String,
				gender: String,
				classes: [
					{
						Class: {
							className: String,
							description: String,
							records: [{record: {type: Schema.ObjectId, ref: 'record'}}]
						}
					}
				]
			}
		}
	],
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	}
}, {
	toJSON: { virtuals: true}
});

var autoPopulateShow = function(next){
	this.populate('federation');
	this.populate('divisions.division.classes.class.records');
	this.populate('_creator');
};

showSchema.pre('findOne', autoPopulateShow).pre('find', autoPopulateShow);

module.exports = mongoose.model('show', showSchema);
