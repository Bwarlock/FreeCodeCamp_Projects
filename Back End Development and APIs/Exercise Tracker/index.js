const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

mongoose
	.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Could not connect to MongoDB", err));

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRoutes);

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
