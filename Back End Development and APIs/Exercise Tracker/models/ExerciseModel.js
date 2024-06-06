const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	description: { type: String, required: true },
	duration: { type: Number, required: true },
	date: {
		type: Date,
		default: () => {
			return new Date(Date.now());
		},
	},
});

module.exports = mongoose.model("Exercise", exerciseSchema);
