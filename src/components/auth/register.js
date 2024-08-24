import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = () => {
      const errors = {};

      if (!name.trim()) {
        errors.name = "Name is required";
      }

      if (!email.trim()) {
        errors.email = "Email is required";
      }

      if (!password.trim()) {
        errors.password = "Password is required";
      }

      return errors;
    };

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
      toast.success("Register Successful.", { autoClose: 3000 });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from the server.");
      } else {
        setError("An error occurred while registering.");
      }
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
          {errors.name && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.name}</p>
          )}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {errors.email && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.email}</p>
          )}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.password}</p>
          )}
        </div>

        <button type="submit">Register</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
