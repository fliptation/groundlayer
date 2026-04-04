import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ideas, ideaVotes, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [row] = await db
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
    .where(eq(ideas.id, parseInt(id)));

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);

  let hasVoted = false;
  if (session?.user) {
    const votes = await db
      .select({ ideaId: ideaVotes.ideaId })
      .from(ideaVotes)
      .where(eq(ideaVotes.userId, session.user.id));
    hasVoted = votes.some((v) => v.ideaId === row.id);
  }

  return NextResponse.json({ ...row, hasVoted });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [existing] = await db
    .select({ userId: ideas.userId })
    .from(ideas)
    .where(eq(ideas.id, parseInt(id)));

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, layer, type } = body;

  const [row] = await db
    .update(ideas)
    .set({
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(layer !== undefined && { layer: parseInt(layer) }),
      ...(type !== undefined && { type }),
      updatedAt: new Date(),
    })
    .where(eq(ideas.id, parseInt(id)))
    .returning();

  return NextResponse.json(row);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [existing] = await db
    .select({ userId: ideas.userId })
    .from(ideas)
    .where(eq(ideas.id, parseInt(id)));

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.delete(ideas).where(eq(ideas.id, parseInt(id)));

  return NextResponse.json({ id: parseInt(id) });
}
