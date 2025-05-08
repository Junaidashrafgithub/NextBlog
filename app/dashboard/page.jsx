import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogPostCard from "../components/general/BlogPostCard";

const fetchData = async (user) => {
    const data = await prisma.blogPost.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return data;
}

export default async function Dashboard() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const blogs = await fetchData(user);

    return (
        <div >
            <div className="flex items-center justify-between mb-4 max-w-8xl mx-auto">
                <h2 className="text-lg font-medium">
                    Recent Articles
                </h2>
                <Link href="/dashboard/create" className={buttonVariants({ variant: "outline" })}>Add New Blog</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    blogs.map((blog) => (
                        <BlogPostCard key={blog.id} data={blog} />
                    ))
                }
            </div>
        </div>
    );
}