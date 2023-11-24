"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import { Spinner } from "@/components/loader";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Heart, Cloud } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import AllComments from "./comments";
import { useCommentStore } from "../_hooks/hook";

const formSchema = z.object({
  content: z.string().min(2).max(50),
});

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const PostById = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [someOneLiked, setSomeOneLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const setSomeOneCommented = useCommentStore(
    (state) => state.setSomeOneCommented
  );
  const { data, isLoading, refetch } = trpc.postById.useQuery(postId);
  const { data: owner } = trpc.postOwner.useQuery(postId);
  const UserLiked = trpc.hasCurrentUserLiked.useQuery(postId);
  const userLiked = UserLiked.data;
  const createComment = trpc.createComment.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Comment Created Successfully");
        setSomeOneCommented();
      }
    },
  });
  const likePost = trpc.likePost.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Post Liked Successfully");
      } else if (data.code === 201) {
        toast.success("Post Unliked Successfully");
      }
      setSomeOneLiked(!someOneLiked);
    },
  });
  const deletePost = trpc.deletePost.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Post Deleted Successfully");
        router.push("/home");
      }
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    UserLiked.refetch();
    refetch();
  }, [someOneLiked]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createComment.mutate({ ...values, postId });
    form.reset();
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  const handleLike = async () => {
    await likePost.mutate(postId);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      await deletePost.mutateAsync(postId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="font-bold text-2xl sm:text-4xl mt-8">{data?.title}</div>
      <div className="w-2/6 p-4 flex flex-col sm:flex-row justify-start items-center gap-4 border-b border-b-gray-200">
        <Image
          alt="userImage"
          src={data?.author.imageURL || ""}
          width={40}
          height={50}
          className="rounded-full"
        />
        <div className="text-sm sm:text-lg">{data?.author.username}</div>
        {owner && (
          <Button onClick={() => router.push(`/post/${data?.id}/edit`)}>
            Edit
          </Button>
        )}
        {owner && (
          <Button disabled={loading} onClick={handleClick}>
            Delete
          </Button>
        )}
      </div>
      <div className="w-2/6 p-4 flex items-center gap-6 border-b border-b-gray-200">
        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={handleLike}
        >
          {userLiked ? <Heart className="fill-red-600" /> : <Heart />}
          <div>{data?.like.length}</div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <Cloud />
              <div>{data?.comment.length}</div>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Comment</SheetTitle>
              <SheetDescription>
                Create a new comment for this post
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-4"
                          placeholder="Enter the comment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
                <Separator />
                <AllComments postId={postId} />
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
      <Editor
        editable={false}
        onChange={(value: string) => console.log(value)}
        initialContent={data?.content}
      />
      <div className="w-full flex flex-col items-center relative bottom-0 bg-gray-200 p-4">
        <Image
          alt="userImage"
          src={data?.author.imageURL || ""}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="text-sm sm:text-lg">
          Written By {data?.author.username}
        </div>
        <div>{data?.author.bio}</div>
      </div>
    </div>
  );
};

export default PostById;
