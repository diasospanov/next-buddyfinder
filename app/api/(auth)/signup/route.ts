import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByUsername } from '../../../../database/users';

/* export type RegisterResponseBodyPost =
  | { errors: { message: string }[] }
  | { user: { username: string } }; */

export async function POST(request: NextRequest) {
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

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 400 },
    );
  }

  // 3. hash the password
  const passwordHash = await bcrypt.hash(body.password, 12);

  // 4. create the user
  const newUser = await createUser(body.username, passwordHash);

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'user creation failed' }] },
      { status: 500 },
    );
  }

  return NextResponse.json({ user: { username: newUser.username } });
}
