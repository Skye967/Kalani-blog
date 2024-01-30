// pages/api/posts/[postId].ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Context } from "vm";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: Context) {
    const { id } = context.params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid post ID" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id)
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};
