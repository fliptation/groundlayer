import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { discussions, replies, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const layer = req.nextUrl.searchParams.get("layer");

  const rows = await db
    .select({
      id: discussions.id,
      title: discussions.title,
      layer: discussions.layer,
      createdAt: discussions.createdAt,
      userName: user.name,
      userId: discussions.userId,
      replyCount: sql<number>`(SELECT count(*) FROM replies WHERE discussion_id = ${discussions.id})`,
    })
    .from(discussions)
    .leftJoin(user, eq(discussions.userId, user.id))
    .where(layer ? eq(discussions.layer, parseInt(layer)) : undefined)
    .orderBy(desc(discussions.updatedAt));

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, layer, firstReply } = body;

  if (!title || !layer) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [discussion] = await db
    .insert(discussions)
    .values({
      title,
      layer: parseInt(layer),
      userId: session.user.id,
    })
    .returning();

  // Create the first reply if provided
  if (firstReply) {
    await db.insert(replies).values({
      content: firstReply,
      discussionId: discussion.id,
      userId: session.user.id,
    });
  }

  return NextResponse.json(discussion, { status: 201 });
}
