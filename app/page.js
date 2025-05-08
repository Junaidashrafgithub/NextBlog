import { prisma } from "./utils/db";
import BlogPostCard from "./components/general/BlogPostCard";

const getData = async () => {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorName: true,
      createdAt: true,
      updatedAt: true,
      authorImage: true,
      authorId: true,
      id: true,
    }
  });
  return data;
}


export default async function Home() {
  const data = await getData();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Latest blogs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          data?.map((item) => {
            return (
              <BlogPostCard key={item.title} data={item} />
            )
          })
        }

      </div>
    </div>
  );
}
