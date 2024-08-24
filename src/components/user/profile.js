import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../../images/profile.jpg";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
        setNewName(response.data.name);
        setNewEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/user/${user._id}`,
        { name: newName, email: newEmail },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Profile Updated Successfully.", { autoClose: 3000 });
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="button-group">
        <button className="post-back-button" onClick={() => navigate("/home")}>
          Back
        </button>
      </div>

      <h2>Your Profile</h2>
      <div className="profile-info">
        <img src={Profile} alt="Profile" />
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button className="post-button" onClick={handleUpdate}>Update Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
