import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import postImage from "../../images/post.jpg";
import "../../App.css";

const ViewPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/post/${postId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("No response from the server.");
        } else {
          setError("An error occurred while fetching the post.");
        }
      }
    };

    fetchPost();
  }, [postId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-post-container">
      <button className="post-button back-button" onClick={handleBack}>
        Back
      </button>
      <div className="view-post-content">
        <h1>{post.title}</h1>
        <img src={postImage} alt="Post" className="post-image" />
        <p>{post.content}</p>
        <p className="post-author">
          <strong>Author:</strong> {post.author.name}
        </p>
        <p className="post-date">
          <strong>Created At:</strong>{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ViewPost;
