import { groq } from "@/app/lib/groq";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json(
      {
        error: "Text is required",
      },
      { status: 400 },
    );
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 20,
    messages: [
      {
        role: "system",
        content: `You are a cron expression generator.
Convert the user's plain English scheduling description into a valid cron expression.
Return ONLY the cron expression — nothing else.
No explanation, no markdown, no quotes.
Use standard 5-field cron format: minute hour day month weekday.
If the input cannot be converted, return: INVALID`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  const cron = response.choices[0].message.content?.trim();

  if (!cron || cron === "INVALID") {
    return NextResponse.json(
      { error: "Could not convert to cron expression" },
      { status: 422 },
    );
  }

  return NextResponse.json({ cron });
}
