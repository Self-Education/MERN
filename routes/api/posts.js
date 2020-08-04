const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");
const { json } = require("express");
const mongoose = require("mongoose");

// @route       POST api/posts
// @desc        create a post
// @access      private
router.post(
	"/",
	[
		auth,
		check("text", "Post content is required").exists(),
		check("title", "Post title is required").exists(),
	],
	async (req, res) => {
		try {
			const currentUser = await User.findOne({ _id: req.user.id });
			const newPost = new Post({
				name: currentUser.name,
				text: req.body.text,
				avatar: currentUser.avatar,
				user: req.user.id,
				title: req.body.title,
			});
			await newPost.save();
			return res.json(newPost);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "server error" });
		}
	}
);

// @route       GET api/posts
// @desc        GET all post
// @access      public
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		return res.json(posts);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "server error" });
	}
});

// @route       GET api/posts/:postId
// @desc        GET a post
// @access      private
router.get("/:postId", auth, async (req, res) => {
	// TODO: check if postId is valid

	try {
		const post = await Post.findOne({ _id: req.params.postId });
		return res.json(post);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "server error" });
	}
});

// @route       DELETE api/posts/:postId
// @desc        DELETE the post
// @access      private
router.delete("/:postId", auth, async (req, res) => {
	const postId = req.params.postId;
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		return res.status(400).json({ msg: "invalid post ID" });
	}
	try {
		const targetPost = await Post.findById(postId);
		// TODO: check if the user owns the post
		if (targetPost.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized !" });
		}
		targetPost.remove();
		return res.json(await Post.find());
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "server error" });
	}
});

// @route       PUT api/posts/like&unlike/:postId
// @desc        Like/unlike a post
// @access      private
router.put("/like&unlke/:postId", auth, async (req, res) => {
	const postId = req.params.postId;
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		return res.status(400).json({ msg: "invalid post ID" });
	}

	const post = await Post.findById(postId);
	const count = post.likes.filter(
		(like) => like.user.toString() === req.user.id
	).length;

	if (count > 0) {
		//unlike it
		post.likes = post.likes.filter(
			(like) => like.user.toString() !== req.user.id
		);
	} else {
		post.likes.unshift({ user: req.user.id });
	}
	await post.save();
	return res.json({ msg: "finished " });
});

// @route       PUT api/posts/comment/:postId
// @desc        comment a post
// @access      private
router.put(
	"/comment/:postId",
	[auth, check("text", "Empty comment is not allowed").exists()],
	async (req, res) => {
		const validationError = validationResult(req);
		if (!validationError.isEmpty()) {
			return res.status(400).josn({ errors: validationError.array() });
		}

		const postId = req.params.postId;

		if (!mongoose.Types.ObjectId.isValid(postId)) {
			return res.status(400).json({ msg: "invalid post ID" });
		}

		try {
			const post = await Post.findOne({ _id: postId });
			console.log("i am here");
			if (!post)
				return res.status(404).json({ msg: "post does not exist" });

			const currentUser = await User.findById(req.user.id);
			const newComment = {
				user: req.user.id,
				text: req.body.text,
				name: currentUser.name,
				avatar: currentUser.avatar,
			};

			post.comments.unshift(newComment);
			await post.save();
			return res.json({ msg: "comment added" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "server error" });
		}
	}
);

// @route       DELETE api/posts/:postId/comment/:commentId
// @desc        DELETE the comment
// @access      private
router.delete("/:postId/comment/:commentId", auth, async (req, res) => {
	const postId = req.params.postId;
	const commentId = req.params.commentId;
	if (
		!mongoose.Types.ObjectId.isValid(postId) ||
		!mongoose.Types.ObjectId.isValid(commentId)
	) {
		return res.status(400).json({ msg: "invalid post ID or comment ID" });
	}
	try {
		const targetPost = await Post.findById(postId);
		const targetComment = targetPost.comments.find(
			(comment) => comment._id.toString() === commentId
		);

		if (!targetComment) {
			return res.status(404).json({ msg: "Comment does not exist" });
		}
		// TODO: check if the user owns the comment
		if (targetComment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized !" });
		}

		targetPost.comments = targetPost.comments.filter(
			(comment) => comment._id.toString() !== commentId
		);

		await targetPost.save();
		return res.json({ msg: " comment deleted! " });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "server error" });
	}
});
module.exports = router;
