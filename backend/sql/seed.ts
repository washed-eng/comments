import { sql } from "bun";

export const seed = async () => {
  await sql`CREATE TABLE IF NOT EXISTS urls (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE
    )`;

  await sql`
      CREATE TABLE IF NOT EXISTS slop (
          id SERIAL PRIMARY KEY,
          url_id INTEGER REFERENCES urls(id) ON DELETE CASCADE,
          name TEXT,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_slop BOOLEAN DEFAULT FALSE
      )
   `;
  await sql`
      CREATE TABLE IF NOT EXISTS comment (
          id SERIAL PRIMARY KEY,
          url TEXT,
          cordinates TEXT,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          resolved BOOLEAN
      )
   `;
};
