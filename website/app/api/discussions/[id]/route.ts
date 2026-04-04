import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { discussions, user } from "@/db/schema";
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
    .where(eq(discussions.id, parseInt(id)));

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(row);
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
    .select({ userId: discussions.userId })
    .from(discussions)
    .where(eq(discussions.id, parseInt(id)));

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, layer } = body;

  const [row] = await db
    .update(discussions)
    .set({
      ...(title !== undefined && { title }),
      ...(layer !== undefined && { layer: parseInt(layer) }),
      updatedAt: new Date(),
    })
    .where(eq(discussions.id, parseInt(id)))
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
    .select({ userId: discussions.userId })
    .from(discussions)
    .where(eq(discussions.id, parseInt(id)));

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.delete(discussions).where(eq(discussions.id, parseInt(id)));

  return NextResponse.json({ id: parseInt(id) });
}
