export async function up(sql) {
  await sql`
  CREATE TABLE singleRuns (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  organiser varchar(40) NOT NULL,
  participant varchar(40) NOT NULL,
  date varchar(30) NOT NULL,
  time varchar(30) NOT NULL,
  distance numeric(30) NOT NULL,
  pace numeric(30) NOT NULL

  )
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE singleRuns
  `;
}
