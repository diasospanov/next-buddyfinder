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
  {
    id: 3,
    organiser: 'Runner-1',
    participant: 'Runner-3',
    date: '14/04/23',
    time: '16:00',
    distance: 15,
    pace: 5.5,
  },
  {
    id: 4,
    organiser: 'Runner-1',
    participant: 'Runner-4',
    date: '21/04/23',
    time: '09:00',
    distance: 10,
    pace: 6,
  },
  {
    id: 5,
    organiser: 'Runner-1',
    participant: 'Runner-5',
    date: '28/04/23',
    time: '16:00',
    distance: 5,
    pace: 7,
  },
  {
    id: 6,
    organiser: 'Runner-1',
    participant: 'Runner-6',
    date: '01/05/23',
    time: '16:30',
    distance: 10,
    pace: 4.5,
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
