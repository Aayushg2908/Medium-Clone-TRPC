"use client";

import { trpc } from "@/app/_trpc/client";
import CommentById from "./comment";

interface Comment {
  id: string;
  content: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    id: string;
    username: string;
    imageURL: string;
    bio: string;
    userid: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

const AllComments = ({ postId }: { postId: string }) => {
  const { data } = trpc.getAllComments.useQuery(postId);

  return (
    <div className="flex flex-col gap-4">
      {data?.map((comment: Comment) => (
        <CommentById comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default AllComments;
