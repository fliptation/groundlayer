import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ideaVotes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ideaId = parseInt(id);

  // Check if already voted
  const existing = await db
    .select()
    .from(ideaVotes)
    .where(and(eq(ideaVotes.ideaId, ideaId), eq(ideaVotes.userId, session.user.id)));

  if (existing.length > 0) {
    // Un-vote
    await db
      .delete(ideaVotes)
      .where(and(eq(ideaVotes.ideaId, ideaId), eq(ideaVotes.userId, session.user.id)));
    return NextResponse.json({ voted: false });
  }

  // Vote
  await db.insert(ideaVotes).values({
    ideaId,
    userId: session.user.id,
  });

  return NextResponse.json({ voted: true });
}
