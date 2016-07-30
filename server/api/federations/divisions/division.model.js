var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var divisionSchema = new Schema({
	divisionName: String,
	gender: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	_creator: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	federation: {
		type: Schema.ObjectId,
		ref: 'federation'
	}
});