import React from "react";
import PostNavbar from "./_components/navbar";
import PostById from "./_components/post";

const PostPage = ({ params }: { params: { postId: string } }) => {
  return (
    <div>
      <PostNavbar />
      <PostById postId={params.postId} />
    </div>
  );
};

export default PostPage;
