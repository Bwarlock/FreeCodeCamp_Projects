const mongoose = require("mongoose");
const Counter = require("./CounterModel");

const urlShortenerSchema = new mongoose.Schema({
	original_url: { type: String, required: true },
	short_url: { type: Number, unique: true },
});

urlShortenerSchema.pre("save", async function (next) {
	if (this.isNew) {
		try {
			const counter = await Counter.findOneAndUpdate(
				{ model: "User" },
				{ $inc: { seq: 1 } },
				{ new: true, upsert: true }
			);
			this.short_url = counter.seq;
			next();
		} catch (error) {
			next(error);
		}
	} else {
		next();
	}
});

module.exports = mongoose.model("UrlShortener", urlShortenerSchema);
