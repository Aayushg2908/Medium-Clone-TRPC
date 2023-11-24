import Sidebar from "./sidebar";
import AllPosts from "./all-posts";
import { Category } from "@prisma/client";

interface PostProps {
  categories: Category[] | undefined;
}

const Posts = ({ categories }: PostProps) => {
  return (
    <div className="flex">
      <AllPosts categories={categories} />
      <Sidebar />
    </div>
  );
};

export default Posts;
