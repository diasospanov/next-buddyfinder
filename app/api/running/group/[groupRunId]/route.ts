import { NextRequest, NextResponse } from 'next/server';
import {
  deleteGroupRunById,
  getGroupRunById,
  GroupRun,
  updateGroupRunById,
} from '../../../../../database/groupRuns';

export type GroupRunResponseBodyGet =
  | {
      error: string;
    }
  | {
      groupRun: GroupRun | undefined;
    };

export type GroupRunResponseBodyPut =
  | {
      error: string;
    }
  | {
      groupRun: GroupRun | undefined;
    };

export type GroupRunResponseBodyDelete =
  | {
      error: string;
    }
  | {
      groupRun: GroupRun | undefined;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<GroupRunResponseBodyGet>> {
  const groupRunId = Number(params.groupRunId);

  if (!groupRunId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const groupRun = await getGroupRunById(groupRunId);
  return NextResponse.json({ groupRun: groupRun });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<GroupRunResponseBodyDelete>> {
  const groupRunId = Number(params.groupRunId);

  if (!groupRunId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const groupRun = await deleteGroupRunById(groupRunId);
  return NextResponse.json({ groupRun: groupRun });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<GroupRunResponseBodyPut>> {
  const groupRunId = Number(params.groupRunId);

  if (!groupRunId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }
  const body = await request.json();
  const newGroupRun = await updateGroupRunById(
    groupRunId,
    body.organiser,
    body.date,
    body.time,
    body.distance,
    body.pace,
  );

  return NextResponse.json({ groupRun: newGroupRun });
}
