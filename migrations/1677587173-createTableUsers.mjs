export async function up(sql) {
  await sql`
  CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(40) NOT NULL UNIQUE,
  password_hash varchar(70) NOT NULL,
  first_name varchar(30),
  last_name varchar(30),
  age numeric(30),
  gender varchar(30)
  )
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE users
  `;
}
