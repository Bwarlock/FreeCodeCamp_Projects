require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dns = require("dns");
const express = require("express");
const app = express();
const UrlShortener = require("./models/UrlShortenerModel");

mongoose
	.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Could not connect to MongoDB", err));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post(
	"/api/shorturl",
	bodyParser.urlencoded({ extended: true }),
	function (req, res) {
		try {
			const url = new URL(req.body.url.toLowerCase()).hostname;
			dns.lookup(url, (err, address, family) => {
				if (err) {
					console.log(err);
					res.json({ error: "invalid url" });
				} else {
					UrlShortener.findOne({ original_url: url })
						.then((result) => {
							if (result) {
								// Handle the case when a record is found
								const { original_url, short_url } = result;
								res.json({ original_url, short_url });
							} else {
								// Handle the case when no record is found
								new UrlShortener({
									original_url: url,
								})
									.save()
									.then((doc) => {
										const { original_url, short_url } = doc;
										res.json({ original_url, short_url });
									})
									.catch((err) => {
										console.log(err);
										res.json({ error: "internal Error" });
									});
							}
						})
						.catch((err) => {
							console.error(err);
							res.json({ error: "internal Error" });
						});
				}
			});
		} catch (err) {
			console.log(err);
			res.json({ error: "invalid url" });
		}
	}
);

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
