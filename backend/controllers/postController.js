const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      user: req.user.id,
    });

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );

    if (!post)
      return res
        .status(403)
        .json({ message: "Unauthorized or post not found" });

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted)
      return res
        .status(403)
        .json({ message: "Unauthorized or post not found" });

    return res.json({ message: "Post deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).populate(
      "user",
      "name email"
    );

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
