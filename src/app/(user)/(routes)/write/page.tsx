import React from "react";
import WriteNavbar from "./_components/navbar";
import { CreateYourPost } from "./_components/post";
import { PostEditor } from "./_components/write-editor";
import prismadb from "@/lib/prismadb";
import { FreeCounter } from "@/components/free-counter";
import { checkApiLimit, getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const CreatePost = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div>
      <WriteNavbar />
      {!isPro && (
        <div className="w-full flex flex-col items-center">
          <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
          <div>Your free limit</div>
        </div>
      )}
      <CreateYourPost />
      <PostEditor categories={categories} />
    </div>
  );
};

export default CreatePost;
