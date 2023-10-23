"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const AllPosts = () => {
  const { data } = trpc.allPosts.useQuery();

  return (
    <div className="w-full lg:w-2/3 mt-4 flex flex-col items-center">
      {data?.map((post) => (
        <Link href={`post/${post.id}`}>
          <Card className="w-[220px] sm:w-[500px] my-4 transition duration-200 shadow-lg hover:shadow-xl hover:scale-105">
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
