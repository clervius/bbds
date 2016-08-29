var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var update = new Schema({
	when: {
		type: Date,
		default: new Date
	}
})
var editorialSchema = new Schema({
	postTitle: String,
	subtitle: String,
	mainImg: Schema.Types.Mixed,
	summary: String,
	author: String,
	ogTitle: String,
	category: String,
	moreContent: Schema.Types.Mixed,
	where:{
		homePage: {
			type: Boolean,
			default: true
		},
		topicPage: {
			type: Boolean,
			default: true
		},
		storyPage: {
			type: Boolean,
			default: true
		}
	},
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