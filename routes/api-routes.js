const router = require("express").Router();
const axios = require("axios");

router.route("/login/local").get((req, res) => {
	console.log(req.body);
	res.json({ local: true });
});

router.route("/signup/local").post((req, res) => {
	console.log(req.body);
	res.json({ signedUp: true });
});

router
	.route("/login")
	.get((req, res) => {
        res.json({message: req.flash("loginMessage")});
    })
	.post((req, res) => {});

router
	.route("/signup")
	.get((req, res) => {
        res.json({message: req.flash("signupMessage")});
    })
	.post((req, res) => {});

router.route("/profile", isLoggedIn, function(req, res) {
    res.json({user: req.user});
});

router.route("/logout", function(req, res) {
    req.logout();
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/");
}

module.exports = router;
