var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var editorialSchema = new Schema({
	postTitle: String,
	mainImg: Schema.Types.Mixed,
	summary: String,
	author: String,
	ogTitle: String,
	category: String,
	content: Schema.Types.Mixed,
	created: {
		type: Date,
		default: new Date
	},
	published: {
		type: Date,
		default: new Date
	},

});

module.exports = mongoose.model('editorial', editorialSchema);