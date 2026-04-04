import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exampleComments, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, asc } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const exampleName = decodeURIComponent(name);

  const rows = await db
    .select({
      id: exampleComments.id,
      content: exampleComments.content,
      createdAt: exampleComments.createdAt,
      userName: user.name,
      userId: exampleComments.userId,
    })
    .from(exampleComments)
    .leftJoin(user, eq(exampleComments.userId, user.id))
    .where(eq(exampleComments.exampleName, exampleName))
    .orderBy(asc(exampleComments.createdAt));

  return NextResponse.json(rows);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await params;
  const exampleName = decodeURIComponent(name);
  const body = await req.json();
  const { content } = body;

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const [row] = await db
    .insert(exampleComments)
    .values({
      exampleName,
      content,
      userId: session.user.id,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
