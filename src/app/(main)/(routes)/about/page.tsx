import React from "react";
import AboutNavbar from "./_components/navbar";
import AboutContent from "./_components/about-content";
import AboutFooter from "./_components/footer";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AboutPage = () => {
  const { userId } = auth();
  if (userId) {
    redirect("/home");
  }

  return (
    <div>
      <AboutNavbar />
      <AboutContent />
      <AboutFooter />
    </div>
  );
};

export default AboutPage;
