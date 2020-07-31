const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("mongodb connected");
	} catch (error) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
