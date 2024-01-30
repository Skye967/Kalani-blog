// pages/api/posts/[postId].tsx
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, context: Context) {
    
     const { id } = context.params;

  if (req.method !== "DELETE") {
    new NextResponse("Method Not Allowed", { status: 405 });
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  if (!id || typeof id !== "string") {
    return new NextResponse("Invalid Post ID", { status: 400 });
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
      if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }
    const deletedPost = await prisma.post.delete({
      where: { id: parseInt(id) },
    });
     
    return NextResponse.json(deletedPost);
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
