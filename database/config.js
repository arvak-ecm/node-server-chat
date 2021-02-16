const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("DDBB online");
	} catch (err) {
		console.log(err);
		throw new Error("Error database connection");
	}
};

module.exports = {
	dbConnection,
};
