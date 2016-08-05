var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
	year: String,
	federation: String,
	show: String,
	athlete: {
		type: Schema.ObjectId,
		ref: 'athlete'
	},
	division: String,
	pictures: Schema.Types.Mixed,
	class: String,
	place: String,
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	createdAt: {
		type: Date,
		default: new Date
	}
}, {
	toJSON: { virtuals: true}
});

var autoPopulateRecord = function(next){
	this.populate('athlete');
	this.populate('_creator');
	next();
}

recordSchema.pre('findOne', autoPopulateRecord).pre('find', autoPopulateRecord);

recordSchema.virtual('createdDate').get(function(){
	return this._id.getTimestamp();
});

module.exports = mongoose.model('record', recordSchema);