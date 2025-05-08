"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";

export async function createPost(formData) {

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }

    const { title, content, imageUrl } = Object.fromEntries(formData);

    await prisma.blogPost.create({
        data: {
            title,
            content,
            imageUrl,
            authorId: user.id,
            authorName: user.given_name + ' ' + user.family_name,
            authorImage: user.picture || '',
        }
    })

    redirect('/dashboard');
}