import { prisma } from "../../utils/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const getData = async (id) => {
    const data = await prisma.blogPost.findUnique({
        where: {
            id: id
        }
    })

    if (!data) {
        return notFound
    }
    return data;
}

const BlogDetail = async ({ params }) => {
    const { id } = params;
    const data = await getData(id);
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/" className={buttonVariants({ variant: "outline" })}>Go Back</Link>
            <div className="mb-8 mt-6">
                <Card>
                    <CardHeader>
                        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="relative size-10 overflow-hidden rounded-full">
                                    <Image src={data.authorImage} alt={data.authorName} fill className="object-cover" />
                                </div>
                                <p className="font-medium">{data.authorName}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                {
                                    new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    }).format(data.createdAt)
                                }
                            </div>
                        </div>
                        <div className="relative h-[400] w-full mb-8 mt-8 overflow-hidden rounded-lg">
                            <Image src={data.imageUrl} alt={data.title} fill className="object-cover" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">{data.content}</p>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
}

export default BlogDetail;
