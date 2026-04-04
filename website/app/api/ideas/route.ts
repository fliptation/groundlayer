import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ideas, ideaVotes, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, sql, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const layer = req.nextUrl.searchParams.get("layer");
  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "20")));
  const offset = (page - 1) * limit;

  const where = layer ? eq(ideas.layer, parseInt(layer)) : undefined;

  const [rows, [{ count }]] = await Promise.all([
    db
      .select({
        id: ideas.id,
        title: ideas.title,
        description: ideas.description,
        layer: ideas.layer,
        type: ideas.type,
        createdAt: ideas.createdAt,
        userName: user.name,
        userId: ideas.userId,
        voteCount: sql<number>`(SELECT count(*) FROM idea_votes WHERE idea_id = ${ideas.id})`,
      })
      .from(ideas)
      .leftJoin(user, eq(ideas.userId, user.id))
      .where(where)
      .orderBy(desc(ideas.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(ideas)
      .where(where),
  ]);

  // Check if current user has voted on each idea
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  const enriched = rows.map((r) => ({ ...r, hasVoted: false }));

  if (session?.user) {
    const votes = await db
      .select({ ideaId: ideaVotes.ideaId })
      .from(ideaVotes)
      .where(eq(ideaVotes.userId, session.user.id));

    const votedIds = new Set(votes.map((v) => v.ideaId));
    for (const r of enriched) {
      r.hasVoted = votedIds.has(r.id);
    }
  }

  return NextResponse.json({ data: enriched, total: Number(count), page, pageSize: limit, hasMore: offset + rows.length < Number(count) });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, layer, type } = body;

  if (!title || !description || !layer) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [row] = await db
    .insert(ideas)
    .values({
      title,
      description,
      layer: parseInt(layer),
      type: type || "proposal",
      userId: session.user.id,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
