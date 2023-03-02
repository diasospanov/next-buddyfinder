import { cache } from 'react';
import { sql } from './connect';

export type SingleRun = {
  id: number;
  organiser: string | null;
  participant: string | null;
  date: string;
  time: string;
  distance: number;
  pace: number;
};

// get all singleRuns
export const getSingleRuns = cache(async () => {
  const singleRuns = await sql<SingleRun[]>`
  SELECT * FROM singleRuns
  `;
  return singleRuns;
});

// create a single singleRun
export const createSingleRun = cache(
  async (
    organiser: string | null,
    date: string,
    time: string,
    distance: number,
    pace: number,
  ) => {
    const [singleRun] = await sql<SingleRun[]>`
      INSERT INTO singleRuns
        (organiser, date, time, distance, pace)
      VALUES
        (${organiser}, ${date}, ${time}, ${distance}, ${pace})
      RETURNING *
    `;
    return singleRun;
  },
);

// get a single singleRun
export const getSingleRunById = cache(async (id: number) => {
  const [run] = await sql<SingleRun[]>`
    SELECT
      *
    FROM
      singleRuns
    WHERE
      id = ${id}
  `;
  return run;
});

// delete a single singleRun
export const deleteSingleRunById = cache(async (id: number) => {
  const [run] = await sql<SingleRun[]>`
    DELETE FROM
      singleRuns
    WHERE
      id = ${id}
    RETURNING *
  `;
  return run;
});

// update a single singleRun
export const updateSingleRunById = cache(
  async (
    id: number,
    organiser: string | null,
    participant: string | null,
    date: string,
    time: string,
    distance: number,
    pace: number,
  ) => {
    const [run] = await sql<SingleRun[]>`
      UPDATE
        singleRuns
      SET
        participant = ${participant},
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
