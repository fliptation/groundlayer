import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { replies, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, asc } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const discussionId = parseInt(id);

  const rows = await db
    .select({
      id: replies.id,
      content: replies.content,
      parentId: replies.parentId,
      createdAt: replies.createdAt,
      userName: user.name,
      userId: replies.userId,
    })
    .from(replies)
    .leftJoin(user, eq(replies.userId, user.id))
    .where(eq(replies.discussionId, discussionId))
    .orderBy(asc(replies.createdAt));

  return NextResponse.json(rows);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const discussionId = parseInt(id);
  const body = await req.json();
  const { content, parentId } = body;

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const [row] = await db
    .insert(replies)
    .values({
      content,
      discussionId,
      parentId: parentId || null,
      userId: session.user.id,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
