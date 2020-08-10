const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const axios = require("axios");
const config = require("config");

// @route       POST api/profile
// @desc        Create/Update profile for the logged in user
// @access      private
router.post(
	"/",
	[
		auth,
		check("skills", "Skills are requried").not().isEmpty(),
		check("status", "Status is requried").not().isEmpty(),
	],
	async (req, res) => {
		const validationError = validationResult(req);
		if (!validationError.isEmpty()) {
			return res.status(400).json({ errors: validationError.array() });
		}

		const {
			company,
			location,
			website,
			bio,
			skills,
			status,
			githubusername,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook,
		} = req.body;
		const profileInfo = { user: req.user.id };
		profileInfo.social = {};
		if (company) profileInfo.company = company;
		if (location) profileInfo.location = location;
		if (website) profileInfo.website = website;
		if (bio) profileInfo.bio = bio;
		if (skills) {
			profileInfo.skills = skills.split(",").map((skill) => skill.trim());
		}
		if (status) profileInfo.status = status;
		if (githubusername) profileInfo.githubusername = githubusername;
		if (youtube) profileInfo.social.youtube = youtube;
		if (twitter) profileInfo.social.twitter = twitter;
		if (instagram) profileInfo.social.instagram = instagram;
		if (linkedin) profileInfo.social.linkedin = linkedin;
		if (facebook) profileInfo.social.facebook = facebook;

		try {
			// check if profile exists, create a new one if not
			const profile = await Profile.findOne({ user: req.user.id });
			console.log("i am inside the create/update profile route");
			if (!profile) {
				const newProfile = new Profile(profileInfo);
				await newProfile.save();
				return res.send("create succefully");
			}

			await Profile.findOneAndUpdate({ user: req.user.id }, profileInfo);
			return res.send(" update succefully");
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server error !");
		}
	}
);

// @route       GET api/profile/me
// @desc        GET current user's profile
// @access      private
router.get("/me", auth, async (req, res) => {
	try {
		console.log(" i am inside get current user profile");
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar"]);
		if (!profile) {
			return res
				.status(400)
				.json({ msg: "Profile not found for this user" });
		}
		return res.json(profile);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	}
});

// @route       GET api/profile
// @desc        GET all profiles
// @access      public
router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", [
			"name",
			"avatar",
		]);
		return res.json(profiles);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Sever error");
	}
});

// @route       GET api/profile/user/:userId
// @desc        GET the profile by user Id
// @access      public
router.get("/user/:userId", async (req, res) => {
	const userId = req.params.userId;
	// TODO: Check if input userId is valid
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return res.status(400).json({ msg: "Invalid user ID" });
	}
	try {
		const profile = await Profile.findOne({ user: userId }).populate(
			"user",
			["name", "avatar"]
		);
		if (!profile) {
			return res.status(400).json({ msg: "Profile not found" });
		}
		return res.json(profile);
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ msg: "server error" });
	}
});

// @route       GET api/profile/github/:username
// @desc        GET the user repos from github
// @access      public
router.get("/github/:githubUsername", async (req, res) => {
	const uri = encodeURI(
		`https://api.github.com/users/${req.params.githubUsername}/repos?per_page=5&sort=created:asc`
	);
	const headers = {
		"user-agent": "node.js",
		Authorization: `token ${config.get("githubToken")}`,
	};
	try {
		const gitHubResponse = await axios.get(uri, { headers });
		return res.json(gitHubResponse.data);
	} catch (error) {
		console.error(error);
		return res.status(500).json("server error");
	}
});
// @route       PUT api/profile/experience
// @desc        add new experience
// @access      private
router.put(
	"/experience",
	[
		auth,
		check("tile", "title is required").exists(),
		check("company", "company is requried").exists(),
		check("from", "start date is requried").exists(),
	],
	async (req, res) => {
		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			return res.json(profile);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "server error" });
		}
	}
);

// @route       PUT api/profile/education
// @desc        add new education
// @access      private
router.put(
	"/education",
	[
		auth,
		check("school", "school is required").exists(),
		check("degree", "degree is requried").exists(),
		check("fieldofstudy", "fieldofstudy is requried").exists(),
		check("from", "start date is requried").exists(),
	],
	async (req, res) => {
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body;

		const newEducation = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEducation);
			await profile.save();
			return res.json(profile);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "server error" });
		}
	}
);

// @route       DELETE api/profile
// @desc        DELETE user and profile
// @access      private
router.delete("/", auth, async (req, res) => {
	try {
		await Profile.findOneAndDelete({ user: req.user.id });
		console.log(req.user.id);
		await User.findOneAndDelete({ _id: req.user.id });
		return res.json({ msg: "user and profile deleted" });
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ msg: "server error" });
	}
});

// @route       DELETE api/profile/experience/:experienceId
// @desc        DELETE experience
// @access      private
router.delete("/experience/:experienceId", auth, async (req, res) => {
	const experienceId = req.params.experienceId;
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });
		foundProfile.experience = foundProfile.experience.filter(
			(exp) => exp._id.toString() != experienceId
		);
		await foundProfile.save();
		return res.json(foundProfile);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "server error" });
	}
});

// @route       DELETE api/profile/education/:educationId
// @desc        DELETE education
// @access      private
router.delete("/education/:educationId", auth, async (req, res) => {
	const educationId = req.params.educationId;
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });
		foundProfile.education = foundProfile.education.filter(
			(edu) => edu._id.toString() != educationId
		);
		await foundProfile.save();
		return res.json(foundProfile);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "server error" });
	}
});

module.exports = router;
