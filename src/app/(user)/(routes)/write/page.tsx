import React from "react";
import WriteNavbar from "./_components/navbar";
import { CreateYourPost } from "./_components/post";
import { PostEditor } from "./_components/write-editor";

const CreatePost = () => {
  return (
    <div>
      <WriteNavbar />
      <CreateYourPost />
      <PostEditor />
    </div>
  );
};

export default CreatePost;
