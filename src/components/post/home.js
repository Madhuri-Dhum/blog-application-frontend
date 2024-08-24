import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postImage from "../../images/post.jpg";
import axios from "axios";
import "../../App.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/post`,
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

  const handleMyPosts = () => {
    navigate("/my-posts");
  };

  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="posts-container">
      <div className="button-group">
        <button className="post-button" onClick={handleAddPost}>
          Add Post
        </button>
        <button className="post-button" onClick={handleMyPosts}>
          My posts
        </button>
      </div>

      <h1>Blog Posts</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            <img src={postImage} alt="Post" className="post-image" />
            <div className="text-content">
              <h2>{post.title}</h2>

              <p className="post-text">
                {post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </p>

              <p className="post-author">
                <strong>Author:</strong> {post.author.name}
              </p>

              <p className="post-date">
                <strong>Created At:</strong>{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              <button
                className="post-button view"
                onClick={() => handleViewPost(post._id)}
              >
                View
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
