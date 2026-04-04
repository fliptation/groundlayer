import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { discussions, replies, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const layer = req.nextUrl.searchParams.get("layer");
  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "20")));
  const offset = (page - 1) * limit;

  const where = layer ? eq(discussions.layer, parseInt(layer)) : undefined;

  const [rows, [{ count }]] = await Promise.all([
    db
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
      .where(where)
      .orderBy(desc(discussions.updatedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(discussions)
      .where(where),
  ]);

  return NextResponse.json({ data: rows, total: Number(count), page, pageSize: limit, hasMore: offset + rows.length < Number(count) });
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
