import { CronExpressionParser } from "cron-parser";
import { NextResponse } from "next/server";
import nodeCron from "node-cron";

export async function POST(request: Request) {
  const { cron, count = 5 } = await request.json();
  const nextRuns: string[] = [];

  if (!cron) {
    return NextResponse.json(
      { error: "Cron Expression required" },
      { status: 400 },
    );
  }

  const isValid = nodeCron.validate(cron);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid cron expression" },
      { status: 400 },
    );
  }

  const interval = CronExpressionParser.parse(cron);

  for (let i = 0; i < count; i++) {
    nextRuns.push(interval.next().toISOString()!);
  }

  return NextResponse.json({ cron, nextRuns });
}
