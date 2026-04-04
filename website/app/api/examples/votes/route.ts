import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exampleVotes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { sql, eq, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const names = req.nextUrl.searchParams.get("names");
  if (!names) {
    return NextResponse.json({});
  }

  const nameList = names.split(",").map((n) => decodeURIComponent(n.trim()));

  // Get scores for all requested examples
  const scores = await db
    .select({
      exampleName: exampleVotes.exampleName,
      score: sql<number>`coalesce(sum(${exampleVotes.value}), 0)`,
    })
    .from(exampleVotes)
    .where(inArray(exampleVotes.exampleName, nameList))
    .groupBy(exampleVotes.exampleName);

  // Get comment counts
  const { exampleComments } = await import("@/db/schema");
  const commentCounts = await db
    .select({
      exampleName: exampleComments.exampleName,
      count: sql<number>`count(*)`,
    })
    .from(exampleComments)
    .where(inArray(exampleComments.exampleName, nameList))
    .groupBy(exampleComments.exampleName);

  // Check if user has voted
  let userVotes: { exampleName: string; value: number }[] = [];
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    userVotes = await db
      .select({
        exampleName: exampleVotes.exampleName,
        value: exampleVotes.value,
      })
      .from(exampleVotes)
      .where(eq(exampleVotes.userId, session.user.id));
  }

  const result: Record<
    string,
    { score: number; userVote: number | null; commentCount: number }
  > = {};
  for (const name of nameList) {
    const scoreRow = scores.find((s) => s.exampleName === name);
    const voteRow = userVotes.find((v) => v.exampleName === name);
    const commentRow = commentCounts.find((c) => c.exampleName === name);
    result[name] = {
      score: scoreRow ? Number(scoreRow.score) : 0,
      userVote: voteRow ? voteRow.value : null,
      commentCount: commentRow ? Number(commentRow.count) : 0,
    };
  }

  return NextResponse.json(result);
}
