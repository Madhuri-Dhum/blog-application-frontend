import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = () => {
      const errors = {};

      if (!title.trim()) {
        errors.title = "Title is required";
      }

      if (!content.trim()) {
        errors.content = "Content is required";
      }

      return errors;
    };

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/home");
      toast.success("Post Added Successfully.", { autoClose: 3000 });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from the server.");
      } else {
        setError("An error occurred while adding the post.");
      }
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (errors.content) {
      setErrors((prevErrors) => ({ ...prevErrors, content: "" }));
    }
  };

  return (
    <div className="form-container">
      <div className="button-group">
        <button className="post-back-button" onClick={() => navigate("/home")}>
          Back
        </button>
      </div>

      <h2>Add New Post</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
          {errors.title && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.title}</p>
          )}
        </div>

        <div>
          <label>Content:</label>
          <textarea value={content} onChange={handleContentChange} />
          {errors.content && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.content}</p>
          )}
        </div>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
