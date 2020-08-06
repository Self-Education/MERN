const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route       Post api/users
// @desc        Reigster users
// @access      Public
router.post(
	"/",
	[
		check("name", "Please input a valid name").trim().notEmpty(),
		check("email", "Please provide a valid email").isEmail(),
		check(
			"password",
			"Please provdie a password with at least 6 characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		console.log("i am inside api/users POST");
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { name, email, password } = req.body;
			// check if user already exists
			// use either await or callback function
			const user = await User.findOne({ email: email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User Already Exists !" }] });
			}

			// Generate Gravatar
			const gravatarURL = await gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			// Hash the password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Create a new user
			const newUser = new User({
				name: name,
				email: email,
				password: hashedPassword,
				avatar: gravatarURL,
			});

			await newUser.save();

			// prepare jwtToken
			const payload = {
				user: {
					id: newUser.id,
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

/* 

Informational responses (100–199),
Successful responses (200–299),
Redirects (300–399),
Client errors (400–499),
and Server errors (500–599). 

*/
