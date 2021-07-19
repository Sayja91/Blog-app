import React from "react";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import "./App.css";
import Blog from "./components/Blog";
import Addblog from "./components/newBlog/NewBlog";

import { useSelector } from "react-redux";
import MBlogpage from "./components/newBlog/MyBlogpage";

const App = () => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const ismodal = useSelector((state) => state.user.modal);
  const getblog = useSelector((state) => state.user.blogpage);

  return (
    <div>
      <Navbar></Navbar>
      <Homepage></Homepage>
      {isSignedIn && !getblog && <Blog />}
      {isSignedIn && ismodal && <Addblog />}
      {isSignedIn && getblog && <MBlogpage></MBlogpage>}
    </div>
  );
};

export default App;
