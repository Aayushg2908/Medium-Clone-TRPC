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
import ThumbnailImage from "./thumbnail-image";
import { trpc } from "@/app/_trpc/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";
import { useProModal } from "@/hooks/use-pro-modal";

interface PostEditorProps {
  categories: Category[];
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  thumbnail: z.string().url(),
  content: z.string().min(1),
  categoryId: z.string().min(1),
});

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export const PostEditor = ({ categories }: PostEditorProps) => {
  const router = useRouter();
  const proModal = useProModal();
  const createdPost = trpc.createPost.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Post created successfully");
        router.refresh();
        router.push("/home");
      }
    },
    onError: (error) => {
      if (error.data?.code === "PRECONDITION_FAILED") {
        proModal.onOpen();
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      content: "",
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createdPost.mutate(values);
  }

  return (
    <div className="w-full flex flex-col items-center">
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                    {...field}
                  />
                </FormControl>
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
                  <Editor onChange={field.onChange} editable={true} />
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
