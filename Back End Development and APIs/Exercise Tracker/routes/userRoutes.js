const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const exerciseController = require("../controllers/exerciseController");
const bodyParser = require("body-parser");

router.post(
	"/",
	bodyParser.urlencoded({ extended: true }),
	userController.createUser
);
router.get("/", userController.getAllUsers);
router.post(
	"/:id/exercises",
	bodyParser.urlencoded({ extended: true }),
	exerciseController.createExercise
);
router.get("/:id/logs", exerciseController.getLogs);

module.exports = router;
