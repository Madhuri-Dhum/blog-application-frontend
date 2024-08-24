import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postImage from "../../images/post.jpg";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/post?byAuthor=true`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("No response from the server.");
        } else {
          setError("An error occurred while fetching posts.");
        }
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = () => {
    navigate("/add");
  };

  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleEditPost = (post) => {
    navigate("/edit", { state: post });
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(posts.filter((post) => post._id !== postId));
      toast.success("Post Deleted Successfully.", { autoClose: 3000 });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from the server.");
      } else {
        setError("An error occurred while deleting posts.");
      }
    }
  };

  return (
    <div className="posts-container">
      <div className="button-group">
        <button className="post-button" onClick={() => navigate("/home")}>
          Back
        </button>
        <button className="post-button" onClick={handleAddPost}>
          Add Post
        </button>
      </div>

      <h1>My Posts</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            <div>
              <img src={postImage} alt="Post" className="post-image" />

              <h2>{post.title}</h2>

              <p className="post-text">
                {post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </p>

              <p className="post-author">
                <strong>Author:</strong> {post.author.name} ({post.author.email}
                )
              </p>

              <p className="post-date">
                <strong>Created At:</strong>{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              <div className="button-group">
                <button
                  className="post-button view"
                  onClick={() => handleViewPost(post._id)}
                >
                  View
                </button>

                <button
                  className="post-button edit"
                  onClick={() => handleEditPost(post)}
                >
                  Edit
                </button>

                <button
                  className="post-button delete"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;
