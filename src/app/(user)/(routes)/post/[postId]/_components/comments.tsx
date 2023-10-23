"use client";

import { trpc } from "@/app/_trpc/client";
import CommentById from "./comment";

const AllComments = ({ postId }: { postId: string }) => {
  const { data } = trpc.getAllComments.useQuery(postId);

  return (
    <div className="flex flex-col gap-4">
      {data?.map((comment) => (
        <CommentById comment={comment} />
      ))}
    </div>
  );
};

export default AllComments;
