const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const routes = require("./routes");
const mongoose = require("mongoose");
// const configDB = require("./config/database.js");
const PORT = process.env.PORT || 3001;

let MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/triviaddicted";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("client/build"));
app.use(routes);

app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
