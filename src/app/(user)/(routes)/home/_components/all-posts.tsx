"use client";

import { trpc } from "@/app/_trpc/client";
import { Categories } from "@/components/categories";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
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

const AllPosts = ({ categories }: { categories: Category[] | undefined }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("categoryName");
  const { data } = trpc.allPosts.useQuery();
  const { data: posts } = trpc.getPostsByCategory.useQuery({
    categoryName: category || "",
  });

  if (category === null) {
    return (
      <div className="w-full mt-4 flex flex-col items-center">
        <Categories items={categories} />
        {data?.map((post: Post) => (
          <Link href={`post/${post.id}`} key={post.id}>
            <Card className="w-[250px] sm:w-[500px] my-4 transition duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              <CardHeader>
                <div className="flex gap-2 items-center">
                  <Image
                    alt="userLogo"
                    src={post.author.imageURL}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>{post.author.username}</div>
                  <div className="hidden sm:flex">
                    {post.createdAt.split("T")[0]}
                  </div>
                </div>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  alt="postThumbnail"
                  src={post.thumbnail}
                  className="w-full h-[200px]"
                  width={100}
                  height={50}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  if (posts && posts.length === 0) {
    return (
      <div className="w-full mt-4 flex flex-col items-center">
        <Categories items={categories} />
        No Posts Found
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      <Categories items={categories} />
      {posts?.map((post: Post) => (
        <Link href={`post/${post.id}`} key={post.id}>
          <Card className="w-[250px] sm:w-[500px] my-4 transition duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            <CardHeader>
              <div className="flex gap-2 items-center">
                <Image
                  alt="userLogo"
                  src={post.author.imageURL}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>{post.author.username}</div>
                <div className="hidden sm:flex">
                  {post.createdAt.split("T")[0]}
                </div>
              </div>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                alt="postThumbnail"
                src={post.thumbnail}
                className="w-full h-[200px]"
                width={100}
                height={50}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default AllPosts;
