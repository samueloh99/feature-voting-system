import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") ?? "";

  const features = await prisma.feature.findMany({
    orderBy: { votes: { _count: "desc" } },
    include: {
      _count: { select: { votes: true } },
      votes: userId ? { where: { userId } } : false,
    },
  });

  const result = features.map(({ votes, ...f }) => ({
    ...f,
    userVoted: userId ? votes.length > 0 : false,
  }));

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();

  if (!title?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }

  const feature = await prisma.feature.create({
    data: { title: title.trim(), description: description.trim() },
    include: { _count: { select: { votes: true } } },
  });

  return NextResponse.json(feature, { status: 201 });
}
