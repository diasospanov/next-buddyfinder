import { NextRequest, NextResponse } from 'next/server';
import {
  deleteSingleRunById,
  getSingleRunById,
  updateSingleRunById,
} from '../../../../../database/singleRuns';

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const singleRunId = Number(params.singleRunId);

  if (!singleRunId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const singleRun = await getSingleRunById(singleRunId);
  return NextResponse.json({ singleRun: singleRun });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const singleRunId = Number(params.singleRunId);

  if (!singleRunId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const singleRun = await deleteSingleRunById(singleRunId);
  return NextResponse.json({ singleRun: singleRun });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const singleRunId = Number(params.singleRunId);

  if (!singleRunId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }
  const body = await request.json();
  const newSingleRun = await updateSingleRunById(
    singleRunId,
    body.organiser,
    body.participant,
    body.date,
    body.time,
    body.distance,
    body.pace,
  );

  return NextResponse.json({ singleRun: newSingleRun });
}
