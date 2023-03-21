import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createSingleRun,
  getSingleRuns,
  SingleRun,
} from '../../../../database/singleRuns';
import { getUserBySessionToken } from '../../../../database/users';

export type SingleRunsResponseBodyGet =
  | {
      error: string;
    }
  | {
      singleRuns: SingleRun[];
    };

export type SingleRunsResponseBodyPost =
  | {
      error: string;
    }
  | {
      singleRun: SingleRun;
    };

export async function GET(): Promise<NextResponse<SingleRunsResponseBodyGet>> {
  const singleRuns = await getSingleRuns();
  return NextResponse.json({ singleRuns: singleRuns });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SingleRunsResponseBodyPost>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'Sign In/Up to create a run' });
  }
  const body = await request.json();
  const newSingleRun = await createSingleRun(
    body.organiser,
    body.participant,
    body.date,
    body.time,
    body.distance,
    body.pace,
  );

  return NextResponse.json({ singleRun: newSingleRun });
}
