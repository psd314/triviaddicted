const router = require("express").Router();
const axios = require("axios");
const passport = require("passport");
const db = require("../models/");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

router.route("/categories").post((req, res) => {
	axios.get("https://opentdb.com/api_category.php").then(resp => {
		// add 'Any' to categories array for dropdown menu
		const categories = resp.data.trivia_categories;
		categories.unshift({
			id: categories[categories.length - 1].id + 1,
			name: "Any"
		});

		res.json(categories);
	});
});

router.route("/questions").post((req, res) => {
	axios.get(req.body.url).then(resp => {
		res.json(resp.data);
	});
});

router.route("/login/local").post((req, res) => {
	// server side validation here
	// make jwt
	// seat jwt in local storage
	// remove jwt in local storage on logout
	db.User.findOne({ "local.email": req.body.email }).then(user => {
		if (user) {
			bcrypt.compare(req.body.password, user.local.password, (err, resp) => {
				if (err) {
					throw err;
				}
				if (resp) {
					const token = jwt.sign(
						{
							id: user._id,
							name: user.local.email
						},
						config.jwtSecret
					);
					res.json({ token });
				} else {
					res.json({ message: "Invalid email and/or password" });
				}
			});
		} else {
			res.json({ message: "Invalid email and/or password" });
		}
	});
});

router.route("/login/guest").post((req, res) => {
	const ip =
		req.headers["x-forwarded-for"].split(",").pop() ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	console.log(ip);
	console.log(req.headers["x-forwarded-for"].split(",").pop());
	// console.log(req.connection.remoteAddress);
	// console.log(req.socket.remoteAddress);
	// console.log(req.connection.socket.remoteAddress);
	// console.log('auth', req.headers['Authorization']);
	// find return, .then()
	// compare hash for guest.ip
	db.User.findOne({ "guest.ip": ip }).then(user => {
		if (user === null) {
			bcrypt.hash(ip, 10, (err, hash) => {
				db.User.create({
					guest: { ip: hash }
				}).then( encryptedUser => {
					console.log(encryptedUser);
					const token = jwt.sign(
						{
							id: encryptedUser._id,
							name: encryptedUser.guest.ip
						},
						config.jwtSecret
					);
					res.json({ token });
				});
			});
			// db.User.create({ guest: { ip: ip } }).then(_ => {
			// 	const token = jwt.sign(
			// 		{
			// 			id: user._id,
			// 			name: user.local.email
			// 		},
			// 		config.jwtSecret
			// 	);
			// 	res.json({ token });
			// });
		} else {
			const token = jwt.sign(
				{
					id: user._id,
					name: user.local.email
				},
				config.jwtSecret
			);
			res.json({ token });
		}
	});
});

router.route("/signup/local").post((req, res) => {
	// server-side validation here
	db.User.find({ "local.email": req.body.email }).then(user => {
		if (user.length > 0) {
			res.json({ message: "This user already exists" });
		} else {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				db.User.create({
					local: { email: req.body.email, password: hash }
				}).then(_ => res.json(true));
			});
		}
	});
});

module.exports = router;
