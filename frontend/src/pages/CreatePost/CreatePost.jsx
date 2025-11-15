import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPost, getPost, updatePost } from "../../services/post";

const CreatePost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      setLoading(true);
      getPost(postId)
        .then(({ data }) => {
          setTitle(data.post.title);
          setContent(data.post.content);
        })
        .catch((err) => console.error("Failed to load post:", err))
        .finally(() => setLoading(false));
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return alert("All fields required");

    setLoading(true);
    try {
      if (postId) {
        await updatePost(postId, { title, content });
        alert("Post updated successfully!");
      } else {
        await createPost({ title, content });
        alert("Post created successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">{postId ? "Update Post" : "Create Post"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Post Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="6"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`btn ${postId ? "btn-success" : "btn-primary"}`}
          disabled={loading}
        >
          {loading ? "Saving..." : postId ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
