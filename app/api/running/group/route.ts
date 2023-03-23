import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createGroupRun,
  getGroupRuns,
  GroupRun,
} from '../../../../database/groupRuns';
import { getUserBySessionToken } from '../../../../database/users';

export type GroupRunsResponseBodyGet =
  | {
      error: string;
    }
  | {
      groupRuns: GroupRun[];
    };

export type GroupRunsResponseBodyPost =
  | {
      error: string;
    }
  | {
      groupRun: GroupRun | undefined;
    };

export async function GET(): Promise<NextResponse<GroupRunsResponseBodyGet>> {
  const groupRuns = await getGroupRuns();
  return NextResponse.json({ groupRuns: groupRuns });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<GroupRunsResponseBodyPost>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (typeof user === 'undefined') {
    return NextResponse.json({ error: 'Sign In/Up to create a run' });
  }
  const body = await request.json();
  const newGroupRun = await createGroupRun(
    body.organiser,
    body.date,
    body.time,
    body.distance,
    body.pace,
  );

  return NextResponse.json({ groupRun: newGroupRun });
}
