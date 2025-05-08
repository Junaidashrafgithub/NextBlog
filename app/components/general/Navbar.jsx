import Link from "next/link";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link href="/">
                    <h1 className="text-4xl font-bold">
                        Next<span className="text-blue-500">Blog</span>
                    </h1>
                </Link>

            </div>
            <div className="hidden sm:flex items-center gap-6 text-4xl">
                <Link href="/" className="text-sm font-medium hover:text-blue-500 transition-colors" >Home</Link>
                <Link href="/dashboard" className="text-sm font-medium hover:text-blue-500 transition-colors" >Dashboard</Link>
                <Link href="/about" className="text-sm font-medium hover:text-blue-500 transition-colors" >About</Link>
                <Link href="/contact-us" className="text-sm font-medium hover:text-blue-500 transition-colors" >Contact Us</Link>
            </div>

            {
                user ? (
                    <div className="flex items-center gap-4">
                        <p className="text-md font-medium hover:text-blue-500 transition-colors">
                            {user?.given_name || user?.family_name ?
                                `${user.given_name || ''} ${user.family_name || ''}`.trim() :
                                "User"}
                        </p>
                        <LogoutLink className={buttonVariants({ variant: "default" })}>Log Out</LogoutLink>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <LoginLink className={buttonVariants({ variant: "default" })}>Sign In</LoginLink>
                        <RegisterLink className={buttonVariants({ variant: "outline" })}>Sign Up</RegisterLink>
                    </div>
                )
            }
        </nav>
    );
}