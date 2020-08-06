const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route       GET api/auth
// @desc        Protect route
// @access      public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		if (error) throw error;
		res.status(500).send("Server error");
	}
});

// @route       POST api/auth
// @desc        Login user
// @access      public
router.post(
	"/",
	[
		check("email", "Please provide a valid email").isEmail(),
		check(
			"password",
			"Please provdie a password with at least 6 characters"
		).exists({ checkNull: true, checkFalsy: true }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { email, password } = req.body;

			// TODO: check if user exists
			// use either await or callback function
			const user = await User.findOne({ email: email });
			if (!user) {
				return res.status(400).json({
					errors: [{ msg: "User does not exist" }],
				});
			}

			// compare password
			const ifMatch = await bcrypt.compare(password, user.password);
			if (!ifMatch) {
				return res.status(400).json({
					errors: [{ msg: "Password and Emial Do Not Match" }],
				});
			}

			// sign jwtToken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSceretKey"),
				{
					expiresIn: 360000,
				},
				(error, token) => {
					if (error) throw error;
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error);
			return res.status(500).send("serer error");
		}
	}
);
module.exports = router;
