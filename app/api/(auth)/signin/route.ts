import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsernameWithPasswordHash } from '../../../../database/users';

export async function POST(
  request: NextRequest,
) {
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

  if (!userWithPasswordHash) {
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

  return NextResponse.json(
    {
      user: { username: userWithPasswordHash.username },
    });
  }
