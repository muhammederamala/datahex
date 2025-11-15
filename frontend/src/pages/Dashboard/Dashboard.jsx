import React, { useEffect, useState } from "react";
import { deletePost, getMyPosts } from "../../services/post";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const { data } = await getMyPosts();
      setPosts(data || []);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(_id);
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Something went wrong while deleting the post.");
      } finally {
        loadPosts();
      }
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Your Posts</h2>
          <Link to="/post/create">
            <button className="btn btn-primary">Create New Post</button>
          </Link>
        </div>

        {posts.length === 0 ? (
          <p>No posts created yet.</p>
        ) : (
          <div className="row">
            {posts.map((post) => (
              <PostCard
                handleDelete={handleDelete}
                key={post._id}
                post={post}
                isDashboard={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
