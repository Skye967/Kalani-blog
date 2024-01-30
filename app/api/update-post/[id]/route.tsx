import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, context: Context) {
  
    const { id } = context.params;

  if (req.method !== "PUT") {
    return new NextResponse("Method Not Allowed",{status: 405})
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

      if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const body = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error);
    return new NextResponse("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
