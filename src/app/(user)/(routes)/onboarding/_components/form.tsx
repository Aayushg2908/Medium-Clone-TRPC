"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/app/_trpc/client";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ProfileImageUpload from "./profile-image-upload";
import { Spinner } from "@/components/loader";

const formSchema = z.object({
  username: z.string().min(3).max(20),
  imageURL: z.string().url(),
  bio: z.string().min(5).max(100),
});

const ProfileForm = () => {
  const router = useRouter();
  const { data, isLoading: loading } = trpc.onboarding.useQuery();
  const { user, isLoaded } = useUser();

  if (loading) return <Spinner />;

  if (data) {
    redirect("/home");
  }
  
  const onboarding = trpc.createUser.useMutation({
    onSuccess: (data) => {
      if (data.code === 400) {
        toast.success("Username already taken");
      } else if (data.code === 200) {
        toast.success("Profile completed successfully");
        router.push("/home");
      }
    },
  });

  if (!isLoaded) {
    return <Spinner />;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.fullName || "",
      imageURL: user?.imageUrl,
      bio: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await onboarding.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:w-2/3 space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Username" {...field} />
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Bio" {...field} />
              </FormControl>
              <FormDescription>Tell us about yourself.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Your Profile Image</FormLabel>
              <FormControl>
                <ProfileImageUpload
                  disabled={isLoading}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                This profile pic will displayed to other users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
