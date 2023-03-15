import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addGroupRunParticipant,
  getGroupRunsParticipants,
  GroupRunsParticipant,
} from '../../../../../database/groupRunsParticipants';
import { getUserBySessionToken } from '../../../../../database/users';

export type GroupRunsParticipantsResponseBodyGet =
  | {
      error: string;
    }
  | {
      groupRunsParticipants: GroupRunsParticipant[];
    };

export type GroupRunsParticipantsResponseBodyPost =
  | {
      error: string;
    }
  | {
      groupRunsParticipant: GroupRunsParticipant;
    };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<GroupRunsParticipantsResponseBodyGet>> {
  const groupRunsParticipants = await getGroupRunsParticipants();
  return NextResponse.json({ groupRunsParticipants: groupRunsParticipants });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<GroupRunsParticipantsResponseBodyPost>> {
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
  const newGroupRunParticipant = await addGroupRunParticipant(
    body.username,
    body.runId,
  );

  return NextResponse.json({
    groupRunsParticipant: newGroupRunParticipant,
  });
}
