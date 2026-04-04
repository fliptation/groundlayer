import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exampleVotes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq, sql } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await params;
  const exampleName = decodeURIComponent(name);
  const body = await req.json();
  const value = body.value === -1 ? -1 : 1;

  const existing = await db
    .select()
    .from(exampleVotes)
    .where(
      and(
        eq(exampleVotes.exampleName, exampleName),
        eq(exampleVotes.userId, session.user.id)
      )
    );

  if (existing.length > 0) {
    if (existing[0].value === value) {
      // Same vote — un-vote
      await db
        .delete(exampleVotes)
        .where(
          and(
            eq(exampleVotes.exampleName, exampleName),
            eq(exampleVotes.userId, session.user.id)
          )
        );
    } else {
      // Different vote — flip
      await db
        .update(exampleVotes)
        .set({ value })
        .where(
          and(
            eq(exampleVotes.exampleName, exampleName),
            eq(exampleVotes.userId, session.user.id)
          )
        );
    }
  } else {
    // New vote
    await db.insert(exampleVotes).values({
      exampleName,
      userId: session.user.id,
      value,
    });
  }

  // Return updated score and user vote
  const [scoreRow] = await db
    .select({
      score: sql<number>`coalesce(sum(${exampleVotes.value}), 0)`,
    })
    .from(exampleVotes)
    .where(eq(exampleVotes.exampleName, exampleName));

  const userVoteRows = await db
    .select({ value: exampleVotes.value })
    .from(exampleVotes)
    .where(
      and(
        eq(exampleVotes.exampleName, exampleName),
        eq(exampleVotes.userId, session.user.id)
      )
    );

  return NextResponse.json({
    score: Number(scoreRow.score),
    userVote: userVoteRows.length > 0 ? userVoteRows[0].value : null,
  });
}
