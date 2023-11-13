"use client";

import { trpc } from "@/app/_trpc/client";
import CommentById from "./comment";
import { Dispatch, useEffect } from "react";
import { useStore } from "zustand";
import { useCommentStore } from "../_hooks/hook";

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
  const someOneCommented = useCommentStore((state) => state.someOneCommented);
  const allComments = trpc.getAllComments.useQuery(postId);
  const data = allComments.data;

  useEffect(() => {
    allComments.refetch();
  }, [someOneCommented]);

  return (
    <div className="flex flex-col gap-4">
      {data?.map((comment: Comment) => (
        <CommentById comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default AllComments;
