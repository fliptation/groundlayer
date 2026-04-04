import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [row] = await db
    .select({
      id: projects.id,
      title: projects.title,
      description: projects.description,
      layer: projects.layer,
      location: projects.location,
      websiteUrl: projects.websiteUrl,
      status: projects.status,
      createdAt: projects.createdAt,
      userName: user.name,
      userId: projects.userId,
    })
    .from(projects)
    .leftJoin(user, eq(projects.userId, user.id))
    .where(eq(projects.id, parseInt(id)));

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
    .select({ userId: projects.userId })
    .from(projects)
    .where(eq(projects.id, parseInt(id)));

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, layer, location, websiteUrl, status } = body;

  const [row] = await db
    .update(projects)
    .set({
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(layer !== undefined && { layer: parseInt(layer) }),
      ...(location !== undefined && { location: location || null }),
      ...(websiteUrl !== undefined && { websiteUrl: websiteUrl || null }),
      ...(status !== undefined && { status }),
      updatedAt: new Date(),
    })
    .where(eq(projects.id, parseInt(id)))
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
    .select({ userId: projects.userId })
    .from(projects)
    .where(eq(projects.id, parseInt(id)));

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.delete(projects).where(eq(projects.id, parseInt(id)));

  return NextResponse.json({ id: parseInt(id) });
}
