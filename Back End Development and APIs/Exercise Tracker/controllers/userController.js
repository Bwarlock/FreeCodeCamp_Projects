const User = require("../models/UserModel");

exports.createUser = async function (req, res) {
	try {
		const doc = await new User({ username: req.body.username }).save({
			new: true,
		});
		res.json(doc);
	} catch (err) {
		res.json({ error: err });
	}
};
exports.getAllUsers = async function (req, res) {
	try {
		const doc = await User.find({});
		res.json(doc);
	} catch (err) {
		res.json({ error: err });
	}
};
