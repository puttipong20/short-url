const express = require("express");
const urlRouter = require("./routes/route");
const { connectionMongoDb } = require("./connection");
const URL = require("./models/model")

const app = express();
const port = 8001;

connectionMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => { console.log("Mongo DB is connected.") });
app.use(express.json());
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
        {
            $push:
            {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    res.redirect(entry.redirecUrl);
});
app.listen(port, () => { console.log("Server is started.") });