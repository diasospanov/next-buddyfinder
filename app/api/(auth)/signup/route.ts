import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../../database/sessions';
import { createUser, getUserByUsername } from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../util/cookies';

export type RegisterResponseBodyPost =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // 1. validate the data
  const body = await request.json();

  // const result = userSchema.safeParse(body);

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

  // 2. check if the user already exist
  // 2.a compare the username with the database

  const user = await getUserByUsername(body.username);

  if (typeof user !== 'undefined') {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 400 },
    );
  }

  // 3. hash the password
  const passwordHash = await bcrypt.hash(body.password, 12);

  // 4. create the user
  const newUser = await createUser(body.username, passwordHash);

  if (typeof newUser === 'undefined') {
    return NextResponse.json(
      { errors: [{ message: 'user creation failed' }] },
      { status: 500 },
    );
  }

  // 5. create a session (in the next chapter)
  // - create the token
  const token = crypto.randomBytes(80).toString('base64');

  // const csrfSecret = createCsrfSecret();

  // - create the session
  const session = await createSession(token, newUser.id);

  if (typeof session === 'undefined') {
    return NextResponse.json(
      { errors: [{ message: 'session creation failed' }] },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // 6. return the new username
  return NextResponse.json(
    { user: { username: newUser.username } },
    {
      status: 200,
      // - Attach the new cookie serialized to the header of the response
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
}
