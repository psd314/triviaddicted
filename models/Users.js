const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
	local: {
		email: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		name: String,
		email: String
	},
	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

module.exports = mongoose.model("User", userSchema);
