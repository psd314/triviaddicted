const router = require("express").Router();
const axios = require("axios");

router
    .route("/api-fetch")
    .get((req, res) => {
        axios
            .get("https://opentdb.com/api_category.php")
            .then(resp => res.json(resp.data));
    });

module.exports = router;