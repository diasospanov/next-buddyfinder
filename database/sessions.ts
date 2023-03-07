import { cache } from 'react';
import { sql } from './connect';

type Session = {
  id: number;
  token: string;
  /* csrfSecret: string; */
};

export const createSession = cache(
  async (token: string, userId: number /* , csrfSecret: string */) => {
    const [session] = await sql<{ id: number; token: string }[]>`
      INSERT INTO sessions
        (token, user_id/* , csrf_secret */)
      VALUES
        (${token}, ${userId}/* , ${csrfSecret} */)
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
