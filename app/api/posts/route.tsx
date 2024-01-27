
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export  async function GET() {

  try {
    // Fetch posts from Prisma
    const posts = await prisma.post.findMany();
      await prisma.$disconnect();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json("Something went wrong");
  }
}
