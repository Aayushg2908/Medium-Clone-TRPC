"use client";

import { trpc } from "@/app/_trpc/client";
import { Spinner } from "@/components/loader";

const Draft = () => {
  const { data, isLoading } = trpc.getUser.useQuery();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return <div> Draft in {data?.username}</div>;
};

export default Draft;
