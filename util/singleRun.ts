import { cache } from 'react';
import { sql } from '../database/connect';

jest.mock('react');

export type SingleRun = {
  id: number;
  organiser: string | null;
  participant: string | null;
  date: string;
  time: string;
  distance: number;
  pace: number;
};

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
