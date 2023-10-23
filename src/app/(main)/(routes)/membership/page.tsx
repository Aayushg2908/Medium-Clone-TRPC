import React from "react";
import MembershipNavbar from "./_components/navbar";
import MembershipContent from "./_components/membership-content";
import MembershipFooter from "./_components/footer";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const MemberShipPage = () => {
  const { userId } = auth();
  if (userId) {
    redirect("/home");
  }

  return (
    <div>
      <MembershipNavbar />
      <MembershipContent />
      <MembershipFooter />
    </div>
  );
};

export default MemberShipPage;
