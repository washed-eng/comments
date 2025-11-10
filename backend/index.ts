import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./src/lib/auth";
import { seed } from "./sql/seed";
import { sql } from "bun";

seed();

const app = new Hono();
app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "*", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/", (c) => c.text("Hello Bun!"));
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
app.post("/api/comment/create", async (c) => {
  const comment = await c.req.json();

  const [row] = await sql`
    INSERT INTO comment (url, cordinates, description, resolved, x_cordinate, y_cordinate)
    VALUES (${comment.url}, ${comment.cordinates}, ${comment.description}, ${comment.resolved}, ${comment.x_cordinate}, ${comment.y_cordinate})
    RETURNING *`;

  if (row) {
    return c.json(row);
  } else {
    c.status(400);
    return c.json({ message: "Failed to create comment" });
  }
});

app.get("/api/comments", async (c) => {
  const comments = await sql`SELECT * FROM comment`;
  return c.json(comments);
});

app.post("/api/comment/resolve", async (c) => {
  const data = await c.req.json();

  const [row] =
    await sql`UPDATE comment SET resolved = ${data.resolved} WHERE id = ${data.id} RETURNING *`;

  if (row) return c.json(row);
  c.status(400);
  return c.json({ message: "Failed to update status" });
});

export default {
  port: 3001,
  fetch: app.fetch,
};
