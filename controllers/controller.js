const shortid = require("shortid");
const URL = require("../models/model")

async function genNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is require." })
    const shortID = shortid(5);
    await URL.create({
        shortId: shortID,
        redirecUrl: body.url,
        visitHistory: [],
    });
    return res.json({ id: shortID });
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    genNewShortUrl,
    getAnalytics
}