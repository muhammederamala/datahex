import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPost } from "../../services/post";
import Navbar from "../../components/Navbar/Navbar";

const PostDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id"); // directly get ?id=123

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Post ID not provided");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await getPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading post...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!post) return <p className="text-center mt-5">Post not found</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Link to="/" className="btn btn-outline-secondary mb-4">
          &larr; Back to Home
        </Link>

        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p className="text-muted mb-2">
              By {post.author?.name || post.authorName || "Unknown"}
            </p>
            <hr />
            <p className="card-text">{post.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
