const singleRuns = [
  {
    id: 1,
    organiser: 'Runner-1',
    participant: 'Runner-1',
    date: '01/04/23',
    time: '10:00',
    distance: 10,
    pace: 5.5,
  },
  {
    id: 2,
    organiser: 'Runner-1',
    participant: 'Runner-2',
    date: '07/04/23',
    time: '17:00',
    distance: 8,
    pace: 7,
  },
];

export async function up(sql) {
  await sql`
  INSERT INTO singleRuns ${sql(
    singleRuns,
    'organiser',
    'participant',
    'date',
    'time',
    'distance',
    'pace',
  )}
  `;
}

export async function down(sql) {
  for (const run of singleRuns) {
    await sql`
    DELETE FROM
    singleRuns
WHERE
id = ${run.id}
    `;
  }
}
