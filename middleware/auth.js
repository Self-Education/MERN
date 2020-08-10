const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
	console.log("inside auth middleware");
	// getToken from server
	const tokenIn = req.header("x-auth-token");

	if (!tokenIn) {
		return res
			.status(401)
			.json({ msg: "No Token, authorization denied !" });
	}

	try {
		// decode and verify token
		const decodedToken = jwt.verify(tokenIn, config.get("jwtSceretKey"));

		// check if user exists in case that user is deleted
		const user = await User.findById(decodedToken.user.id);
		if (!user)
			return res.status(400).json({ msg: "The user does not exit !" });
		// set request user, so user will automatically login after registration
		req.user = decodedToken.user;

		// give away the controll to callback func
		next();
	} catch (error) {
		return res.status(401).json({ msg: "Token is not valid !" });
	}
};
