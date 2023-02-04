const express = require("express");
const {genNewShortUrl , getAnalytics} = require("../controllers/controller");
const router = express.Router();

router.post("/", genNewShortUrl);

router.get("/analytics/:shortId",getAnalytics)

module.exports = router; 
