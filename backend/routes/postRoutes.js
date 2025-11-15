const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getAllPosts);

router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/my-posts", auth, getAllPosts);

router.get("/:id", getPostById);

module.exports = router;
