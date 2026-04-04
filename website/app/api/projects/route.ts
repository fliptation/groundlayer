import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const layer = req.nextUrl.searchParams.get("layer");

  const rows = await db
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
    .where(layer ? eq(projects.layer, parseInt(layer)) : undefined)
    .orderBy(desc(projects.createdAt));

  return NextResponse.json(rows);
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
