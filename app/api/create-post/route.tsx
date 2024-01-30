import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    console.log(req.method)

    if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", {status: 405})
  }

    const body = await req.json();
    
    console.log(body.title)

  try {
    const createdPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        // Add other fields as needed
      },
    });
        
    return NextResponse.json(createdPost);
  } catch (error) {
      console.error("Error creating post:", error);
    return new NextResponse("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
