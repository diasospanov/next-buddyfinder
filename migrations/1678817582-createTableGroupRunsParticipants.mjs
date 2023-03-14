export async function up(sql) {
  await sql`
    CREATE TABLE group_runs_participants (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar REFERENCES users (username) ON DELETE CASCADE,
      run_id integer REFERENCES groupRuns (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE group_runs_participants
  `;
}
