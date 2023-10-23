"use client";
import { trpc } from "@/app/_trpc/client";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import HomeNavbar from "./_components/navbar";
import Posts from "./_components/posts";

const HomePage = () => {
  const { data } = trpc.onboarding.useQuery();

  if (data === null) {
    redirect("/onboarding");
  }

  return (
    <div>
      <HomeNavbar />
      <Posts />
    </div>
  );
};

export default HomePage;
