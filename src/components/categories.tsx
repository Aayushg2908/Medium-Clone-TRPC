import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@prisma/client";
import Link from "next/link";

export function Categories({
  categories,
}: {
  categories: Category[] | undefined;
}) {
  return (
    <Tabs defaultValue="home" className="hidden sm:inline-block lg:w-fit">
      <TabsList className="flex gap-x-2 ">
        <Link href="/home">
          <TabsTrigger value="home">For You</TabsTrigger>
        </Link>
        {categories?.map((category) => (
          <Link key={category.id} href={`/home?categoryName=${category.name}`}>
            <TabsTrigger key={category.id} value={category.name}>
              {category.name}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
