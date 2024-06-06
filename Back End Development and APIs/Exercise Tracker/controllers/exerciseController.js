const Exercise = require("../models/ExerciseModel");
const User = require("../models/UserModel");

exports.createExercise = async function (req, res) {
	try {
		console.log(req.body);
		const user = await User.findById(req.params.id);
		const exercise = req.body?.date
			? await new Exercise({
					user: user._id,
					description: req.body.description,
					duration: req.body.duration,
					date: req.body.date,
			  }).save({ new: true })
			: await new Exercise({
					user: user._id,
					description: req.body.description,
					duration: req.body.duration,
			  }).save({ new: true });
		res.json({
			_id: user._id,
			username: user.username,
			description: exercise.description,
			duration: exercise.duration,
			date: exercise.date.toDateString(),
		});
	} catch (err) {
		res.json({ error: err });
	}
};
exports.getLogs = async function (req, res) {
	try {
		const user = await User.findById(req.params.id);
		const query = {
			user: user._id,
		};
		if (req.query?.from && req.query?.to) {
			query.date = {
				$gte: new Date(req.query.from),
				$lte: new Date(req.query.to),
			};
		} else if (req.query?.from) {
			query.date = {
				$gte: new Date(req.query.from),
			};
		} else if (req.query?.to) {
			query.date = {
				$lte: new Date(req.query.to),
			};
		}

		const exercise = await Exercise.find(query)
			.select({
				description: true,
				duration: true,
				date: true,
			})
			.limit(req.query?.limit || null)
			.exec();

		res.json({
			_id: user._id,
			username: user.username,
			count: exercise.length,
			log: exercise.map((exer) => {
				return {
					description: exer.description,
					duration: exer.duration,
					date: exer.date.toDateString(),
				};
			}),
		});
	} catch (err) {
		res.json({ error: err });
	}
};
