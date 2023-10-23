import LandingHero from "@/components/landing-hero";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/home");
  }

  return (
    <div>
      <Navbar />
      <LandingHero />
    </div>
  );
}
