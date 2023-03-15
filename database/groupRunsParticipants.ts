import { cache } from 'react';
import { sql } from './connect';

export type GroupRunsParticipant = {
  id: number;
  username: string;
  runId: number;
};

// get all groupRunsParticipants
export const getGroupRunsParticipants = cache(async () => {
  const groupRunsParticipants = await sql<GroupRunsParticipant[]>`
  SELECT * FROM group_runs_participants
  `;
  return groupRunsParticipants;
});

// add a groupRunParticipant
export const addGroupRunParticipant = cache(
  async (
    username: string,

    runId: number,
  ) => {
    const [groupRunsParticipant] = await sql<GroupRunsParticipant[]>`
      INSERT INTO group_runs_participants
        (username, run_id)
      VALUES
        (${username}, ${runId})
      RETURNING *
    `;
    return groupRunsParticipant;
  },
);

// get a single groupRun Participants
export const getGroupRunParticipantsByRunId = cache(async (id: number) => {
  const participants = await sql<GroupRunsParticipant[]>`
    SELECT
      *
    FROM
    group_runs_participants
    WHERE
    run_id = ${id}
  `;
  return participants;
});
