import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

type UserWithoutPasswordHash = User & {
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  gender: string | null;
};

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<UserWithoutPasswordHash[]>`
    SELECT
      id,
      username,
      first_name,
      last_name,
      age,
      gender
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      id,
      username,
      password_hash
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<UserWithoutPasswordHash[]>`
    SELECT
      id,
      username,
      first_name,
      last_name,
      age,
      gender
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<{ id: number; username: string }[]>`
      INSERT INTO users
        (username, password_hash)
      VALUES
        (${username}, ${passwordHash})
      RETURNING
        id,
        username
    `;
    return user;
  },
);

// delete a user by username
/* export const deleteUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
    username = ${username}
    RETURNING *
  `;
  return user;
});
 */
