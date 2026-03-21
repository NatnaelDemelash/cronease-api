import { NextRequest, NextResponse } from 'next/server';
import nodeCron from 'node-cron';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { cron } = body;

  if (!cron) {
    return NextResponse.json(
      { error: 'Cron expression is required' },
      { status: 400 },
    );
  }

  const isValidCron = nodeCron.validate(cron);
  if (!isValidCron) {
    return NextResponse.json(
      { error: 'Invalid cron expression' },
      { status: 400 },
    );
  }

  return NextResponse.json({
    cron,
    valid: true,
    message: 'Cron expression is valid',
  });
}
