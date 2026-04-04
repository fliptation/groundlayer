import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const layer = req.nextUrl.searchParams.get("layer");
  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "20")));
  const offset = (page - 1) * limit;

  const where = layer ? eq(projects.layer, parseInt(layer)) : undefined;

  const [rows, [{ count }]] = await Promise.all([
    db
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
      .where(where)
      .orderBy(desc(projects.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
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
  const { title, description, layer, location, websiteUrl, status } = body;

  if (!title || !description || !layer) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [row] = await db
    .insert(projects)
    .values({
      title,
      description,
      layer: parseInt(layer),
      location: location || null,
      websiteUrl: websiteUrl || null,
      status: status || "idea",
      userId: session.user.id,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
