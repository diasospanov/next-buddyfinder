import { NextRequest, NextResponse } from 'next/server';
import {
  deleteSingleRunById,
  getSingleRunById,
  SingleRun,
  updateSingleRunById,
} from '../../../../../database/singleRuns';

export type SingleRunResponseBodyGet =
  | {
      error: string;
    }
  | {
      singleRun: SingleRun | undefined;
    };

export type SingleRunResponseBodyPut =
  | {
      error: string;
    }
  | {
      singleRun: SingleRun | undefined;
    };

export type SingleRunResponseBodyDelete =
  | {
      error: string;
    }
  | {
      singleRun: SingleRun | undefined;
    };

export async function GET({
  params,
}: {
  params: Record<string, string | string[]>;
}): Promise<NextResponse<SingleRunResponseBodyGet>> {
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
): Promise<NextResponse<SingleRunResponseBodyDelete>> {
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
): Promise<NextResponse<SingleRunResponseBodyPut>> {
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
