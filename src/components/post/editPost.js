import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state;
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/post/${post._id}`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/my-posts");
      toast.success("Post Updated Successfully.", { autoClose: 3000 });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from the server.");
      } else {
        setError("An error occurred while editing post.");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="button-group">
        <button
          className="post-back-button"
          onClick={() => navigate("/my-posts")}
        >
          Back
        </button>
      </div>

      <h2>Edit Post</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
