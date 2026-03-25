import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const featureId = parseInt(id);
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (isNaN(featureId)) {
    return NextResponse.json({ error: "Invalid feature id" }, { status: 400 });
  }

  const existing = await prisma.vote.findUnique({
    where: { featureId_userId: { featureId, userId } },
  });

  if (existing) {
    await prisma.vote.delete({ where: { id: existing.id } });
  } else {
    await prisma.vote.create({ data: { featureId, userId } });
  }

  const updated = await prisma.feature.findUnique({
    where: { id: featureId },
    include: { _count: { select: { votes: true } } },
  });

  return NextResponse.json(updated);
}
