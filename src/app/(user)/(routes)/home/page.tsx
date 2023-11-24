"use client";
import { trpc } from "@/app/_trpc/client";
import { redirect } from "next/navigation";
import HomeNavbar from "./_components/navbar";
import Posts from "./_components/posts";

const HomePage = () => {
  const { data } = trpc.onboarding.useQuery();
  const { data: categories } = trpc.getAllCategories.useQuery();
  if (data === null) {
    redirect("/onboarding");
  }

  return (
    <div>
      <HomeNavbar />
      <Posts categories={categories} />
    </div>
  );
};

export default HomePage;
