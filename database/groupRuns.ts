import { cache } from 'react';
import { sql } from './connect';

export type GroupRun = {
  id: number;
  organiser: string | null;
  date: string;
  time: string;
  distance: number;
  pace: number;
};

// get all groupRuns
export const getGroupRuns = cache(async () => {
  const groupRuns = await sql<GroupRun[]>`
  SELECT * FROM groupRuns
  `;
  return groupRuns;
});

// create a single groupRun
export const createGroupRun = cache(
  async (
    organiser: string | null,
    date: string,
    time: string,
    distance: number,
    pace: number,
  ) => {
    const [groupRun] = await sql<GroupRun[]>`
      INSERT INTO groupRuns
        (organiser, date, time, distance, pace)
      VALUES
        (${organiser}, ${date}, ${time}, ${distance}, ${pace})
      RETURNING *
    `;
    return groupRun;
  },
);

// get a single groupRun
export const getGroupRunById = cache(async (id: number) => {
  const [run] = await sql<GroupRun[]>`
    SELECT
      *
    FROM
      groupRuns
    WHERE
      id = ${id}
  `;
  return run;
});

// delete a single groupRun
export const deleteGroupRunById = cache(async (id: number) => {
  const [run] = await sql<GroupRun[]>`
    DELETE FROM
      groupRuns
    WHERE
      id = ${id}
    RETURNING *
  `;
  return run;
});

// update a single singleRun
export const updateGroupRunById = cache(
  async (
    id: number,
    organiser: string | null,
    date: string,
    time: string,
    distance: number,
    pace: number,
  ) => {
    const [run] = await sql<GroupRun[]>`
      UPDATE
        groupRuns
      SET
        organiser = ${organiser},
        date = ${date},
        time = ${time},
        distance = ${distance},
        pace = ${pace}
      WHERE
        id = ${id}
      RETURNING *
    `;
    return run;
  },
);
