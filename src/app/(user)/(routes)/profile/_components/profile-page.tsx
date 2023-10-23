"use client";

import { trpc } from "@/app/_trpc/client";
import { Spinner } from "@/components/loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UserPosts from "./user-posts";

const Profile = () => {
  const { data, isLoading } = trpc.getUser.useQuery();
  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row">
      <div className="w-full sm:w-2/3 flex flex-col items-center justify-center border-r border-r-gray-100">
        <div className="w-full text-center p-2 font-bold text-2xl sm:text-4xl mt-4 tracking-tighter border-b border-b-gray-100">
          {data?.username}
        </div>
        <UserPosts />
      </div>
      <div className="w-full sm:w-1/3 flex flex-col mt-4 ml-4 border-b border-b-gray-100 p-4">
        <Image
          alt="userProfile"
          src={data?.imageURL || ""}
          width={70}
          height={70}
          className="rounded-full"
        />
        <div className="opacity-50 font-bold mt-4">{data?.username}</div>
        <div className="opacity-40 font-semibold mt-4">{data?.bio}</div>
        <Link href="/profile/edit" className="w-fit">
          <Button className="mt-4">Edit Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
