import React from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../services/post";

const PostCard = ({ post, isDashboard = false, handleDelete }) => {
  const { _id, title, content, user, author, authorName } = post;
  const displayName = user?.name || author?.name || authorName || "Unknown";

  return (
    <div className="col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted" style={{ flex: 1 }}>
            {content
              ? content.slice(0, 100) + (content.length > 100 ? "..." : "")
              : ""}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-secondary">By: {displayName}</small>
            <div>
              {isDashboard ? (
                <>
                  <Link
                    to={`/post/create?id=${_id}`}
                    className="btn btn-sm btn-outline-secondary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <Link
                  to={`/post?id=${_id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Read
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
