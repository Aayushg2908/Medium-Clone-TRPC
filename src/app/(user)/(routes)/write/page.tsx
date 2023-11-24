import React from "react";
import WriteNavbar from "./_components/navbar";
import { CreateYourPost } from "./_components/post";
import { PostEditor } from "./_components/write-editor";
import prismadb from "@/lib/prismadb";

const CreatePost = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div>
      <WriteNavbar />
      <CreateYourPost />
      <PostEditor categories={categories} />
    </div>
  );
};

export default CreatePost;
