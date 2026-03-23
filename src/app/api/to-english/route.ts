import cronstrue from "cronstrue";
import { NextResponse } from "next/server";
import nodeCron from "node-cron";

export async function POST(request: Request) {
  const { cron } = await request.json();

  if (!cron) {
    return NextResponse.json(
      { error: "Cron expression is required" },
      { status: 400 },
    );
  }

  const isValid = nodeCron.validate(cron);
  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid cron expression" },
      {
        status: 400,
      },
    );
  }

  const description = cronstrue.toString(cron);

  return NextResponse.json({ cron, description });
}
