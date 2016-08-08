'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var record = require('../competitions/records/record.model');
var ogs = require('open-graph-scraper');
var Metascraper = require('metascraper')

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
	images: [{image: Schema.Types.Mixed}]
});

var video = new Schema({
	videoName: String,
	description: String,
	file: String
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
	createdAt: {
		type: Date,
		default: new Date
	}
}, {
	toJSON : { virtuals: true}
});


var athleteSchema = new Schema({
	dob: Date,
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
/*
athleteSchema.pre('save', function(next){

	var scrape = function(element){
		ogs({'url': element.link}, function(err, results){
			console.log(results)
			if(err){console.log(err)}
			else{element.meta = results;}
		})
	}
	this.published.forEach(scrape);
})
athleteSchema.pre('find', function(next){
	this.published.forEach(function(element){
		Metascraper.scrapeUrl(element.link).then((metadata) => {
			element.meta = metadata
		})

	})

}).pre('findOne', function(next){
	this.published.forEach(function(element){
		Metascraper.scrapeUrl(element.link).then((metadata) => {
			element.meta = metadata
		})

	})

})*//*
publishing.virtual('meta').get(function(){
	Metascraper.scrapeUrl(this.link).then((metadata) => {
		return metadata;
	})
});*/
athleteSchema.methods.scrape = function(){
	this.published.forEach(function(element){
		Metascraper.scrapeUrl(element.link).then((metadata) => {
			element.meta = metadata;
		})
	})
}
module.exports = mongoose.model('athlete', athleteSchema);