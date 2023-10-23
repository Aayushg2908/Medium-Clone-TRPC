"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
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
import ThumbnailImage from "./_components/thumbnail-image";
import { trpc } from "@/app/_trpc/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  thumbnail: z.string().url(),
  content: z.string().min(1),
});

const EditPage = ({ params }: { params: { postId: string } }) => {
  const router = useRouter();
  const { data, isLoading } = trpc.postById.useQuery(params.postId);
  const updatedPost = trpc.updatePost.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Post updated successfully");
        router.push(`/post/${params.postId}`);
      }
    },
  });

  const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      content: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        thumbnail: data.thumbnail,
        content: data.content,
      });
    }
  }, [isLoading]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updatedPost.mutate({ ...values, postId: params.postId });
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-2/3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the main title of your Post"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <ThumbnailImage
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main content</FormLabel>
                <FormControl>
                  <Editor
                    onChange={field.onChange}
                    editable={true}
                    initialContent={data?.content}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditPage;
