import { NextRequest, NextResponse } from 'next/server';
import {
  createSingleRun,
  getSingleRuns,
} from '../../../../database/singleRuns';

export async function GET(request: NextRequest) {
  const singleRuns = await getSingleRuns();
  return NextResponse.json({ singleRuns: singleRuns });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newSingleRun = await createSingleRun(
    body.organiser,
    body.date,
    body.time,
    body.distance,
    body.pace,
  );

  return NextResponse.json({ singleRun: newSingleRun });
}
