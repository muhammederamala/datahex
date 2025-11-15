// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../services/post";
import Navbar from "../../components/Navbar/Navbar"; // import the common Navbar
import PostCard from "../../components/PostCard/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getAllPosts();
        setPosts(data.posts ?? data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {/* Reusable Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container">
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="row">
            {posts.map((post) => (
              <PostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
