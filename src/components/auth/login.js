import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(process.env.REACT_APP_BASE_URL);
    const validate = () => {
      const errors = {};

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
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.data.token);

      navigate("/home");

      toast.success("Login Successful.", { autoClose: 3000 });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from the server.");
      } else {
        setError("An error occurred while logging in.");
      }
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Don't have an account? <a href="/Register">Register Here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
