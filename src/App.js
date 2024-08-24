import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/post/header";
import AddPost from "./components/post/addPost";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/post/home";
import MyPosts from "./components/post/myPosts";
import EditPost from "./components/post/editPost";
import ViewPost from "./components/post/viewPost";
import UserProfile from "./components/user/profile";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add" element={<AddPost />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/my-posts" element={<MyPosts />} />
          <Route exact path="/edit" element={<EditPost />} />
          <Route path="/post/:postId" element={<ViewPost />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
