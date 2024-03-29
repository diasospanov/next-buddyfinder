import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../../database/sessions';
import { getUserByUsernameWithPasswordHash } from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../util/cookies';

export type LoginResponseBodyPost =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // 1. validate the data
  const body = await request.json();

  if (!body) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        errors: [{ message: 'server could not process the request' }],
      },
      { status: 400 },
    );
  }

  // check if the string is empty
  if (!body.username || !body.password) {
    return NextResponse.json(
      { errors: [{ message: 'username or password is empty' }] },
      { status: 400 },
    );
  }

  // 2. check if the user exist
  const userWithPasswordHash = await getUserByUsernameWithPasswordHash(
    body.username,
  );

  if (typeof userWithPasswordHash === 'undefined') {
    // consider using the same output for user or password not valid
    return NextResponse.json(
      { errors: [{ message: 'user not found' }] },
      { status: 401 },
    );
  }

  // 3. validate the password
  const isPasswordValid = await bcrypt.compare(
    body.password,
    userWithPasswordHash.passwordHash,
  ); // Boolean

  if (!isPasswordValid) {
    // consider using the same output for user or password not valid
    return NextResponse.json(
      { errors: [{ message: 'password is not valid' }] },
      { status: 401 },
    );
  }

  // 4. create a session
  // - create the token
  const token = crypto.randomBytes(80).toString('base64');

  // const csrfSecret = createCsrfSecret();

  // - create the session
  const session = await createSession(token, userWithPasswordHash.id);

  if (typeof session === 'undefined') {
    return NextResponse.json(
      { errors: [{ message: 'session creation failed' }] },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // add the new header

  return NextResponse.json(
    {
      user: { username: userWithPasswordHash.username },
    },
    {
      status: 200,
      // - Attach the new cookie serialized to the header of the response
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
}
