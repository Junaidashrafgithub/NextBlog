"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { createPost } from "../../actions";
import { useFormStatus } from "react-dom";

// Submit button component that uses useFormStatus
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button 
            type="submit" 
            disabled={pending} 
            className="mt-4 w-full"
        >
            {pending ? "Creating..." : "Create Post"}
        </Button>
    );
}

export default function Create() {
    return (
        <div>
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Add Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createPost} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" type="text" required placeholder="Title" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea name="content" required placeholder="Content" rows={6} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Image</Label>
                            <Input type="url" name="imageUrl" required placeholder="Image URL" />
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}