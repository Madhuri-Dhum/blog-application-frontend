import React from "react";
import "../../App.css";
import Profile from "../../images/profile.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogoutButton = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTitleClick = () => {
    navigate("/home");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="header">
      <div
        className="header-title"
        onClick={handleTitleClick}
        style={{ cursor: "pointer" }}
      >
        <h1>Blog-App</h1>
      </div>

      {token && (
        <div className="right-header">
          <div className="header-profile">
            <img
              src={Profile}
              alt="Profile"
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            />
          </div>
          <button className="logout-button" onClick={handleLogoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
