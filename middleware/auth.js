const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
		// set request user, so user will automatically login after registration
		req.user = decodedToken.user;

		// give away the controll to callback func
		next();
	} catch (error) {
		return res.status(401).json({ msg: "Token is not valid !" });
	}
};
