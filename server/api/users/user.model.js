var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
	fname: String,
	lname: String,
	mname: String,
	email: String,
	username: {
		type: String,
		lowercase: true
	},
	phone: Number,
	role: {
		type: String,
		default: 'user'
	},
	address: {
		street: String,
		city: String,
		state: String,
		zip: Number
	},
	password: String,
	salt: String,
	created: {
		type: Date,
		default: new Date
	}
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);