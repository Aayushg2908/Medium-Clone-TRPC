import React from "react";
import Sidebar from "./sidebar";
import AllPosts from "./all-posts";

const Posts = () => {
  return (
    <div className="flex">
      <AllPosts />
      <Sidebar />
    </div>
  );
};

export default Posts;
