var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
	year: Number,
	federation: {
		type: Schema.ObjectId,
		ref: 'federation'
	},
	show: {
		type: Schema.ObjectId,
		ref: 'show'
	},
	athlete: {
		type: Schema.ObjectId,
		ref: 'athlete'
	},
	division: String,
	class: String,
	Place:Number,
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	}
}, {
	toJSON: { virtuals: true}
});

var autoPopulateRecord = function(next){
	this.populate('federation');
	this.populate('show');
	this.populate('athlete');
	this.populate('_creator');
	next();
}

recordSchema.pre('findOne', autoPopulateRecord).pre('find', autoPopulateRecord);

recordSchema.virtual('createdDate').get(fucntion(){
	return this._id.getTimestamp();
});

module.exports = mongoose.model('record', recordSchema);