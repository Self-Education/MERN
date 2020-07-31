const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
// @route       GET api/profile
// @desc        Test route
// @access      public
router.get("/", (req, res) => res.send("profile Route"));

module.exports = router;
