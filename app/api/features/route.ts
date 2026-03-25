import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const features = await prisma.feature.findMany({
    orderBy: { votes: { _count: "desc" } },
    include: { _count: { select: { votes: true } } },
  });

  return NextResponse.json(features);
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
