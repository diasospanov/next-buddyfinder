import { cache } from 'react';
import { sql } from './connect';

export const createSession = cache(
  async (token: string, userId: number /* , csrfSecret: string */) => {
    const [session] = await sql<{ id: number; token: string }[]>`
      INSERT INTO sessions
        (token, user_id)
      VALUES
        (${token}, ${userId})
      RETURNING
        id,
        token
    `;

    await deleteExpiredSessions();

    return session;
  },
);

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});
