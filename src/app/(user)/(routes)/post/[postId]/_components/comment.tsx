"use client";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import { toast } from "react-hot-toast";

interface CommentProps {
  comment: {
    content: string;
    postId: string;
    id: string;
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
  };
}

const CommentById = ({ comment }: CommentProps) => {
  const deleteComment = trpc.deleteComment.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Comment Deleted Successfully");
        window.location.reload();
      }
    },
  });
  const { data } = trpc.commentOwner.useQuery(comment.id);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Image
          alt="userImage"
          src={comment.author.imageURL}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>{comment.author.username}</div>
        <div>{comment.createdAt.split("T")[0]}</div>
        {data && (
          <div
            className="cursor-pointer"
            onClick={async () => {
              await deleteComment.mutate(comment.id);
            }}
          >
            <Trash2 />
          </div>
        )}
      </div>
      <div className="font-bold tracking-tight">{comment.content}</div>
      <Separator />
    </div>
  );
};

export default CommentById;