const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api-routes");

// check for API routes
router.use("/", apiRoutes);

// If no api routes are hit, serve the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));   
});

module.exports = router;