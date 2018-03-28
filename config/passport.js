const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = passport => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		"local-signup",
		new LocalStrategy({
			username: "email",
			passwordField: "password",
			passReqToCallback: true
		}),
		(req, email, password, done) => {
			process.nextTick(() => {
                User.findOne({ "local.email": email }, (err, user) => {
                    if (err) return done(err);

                    
                });
            });
		}
	);
};
