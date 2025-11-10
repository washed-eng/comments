import { Hono } from "hono";
import { auth } from "../../lib/auth";
import { cors } from "hono/cors";
const authHandler = new Hono();

// authHandler.use(
//   "http://localhost:3000", // or replace with "*" to enable cors for all routes
//   cors({
//     origin: "http://localhost:3000", // replace with your origin
//     allowHeaders: ["Content-Type", "Authorization"],
//     allowMethods: ["POST", "GET", "OPTIONS"],
//     exposeHeaders: ["Content-Length"],
//     maxAge: 600,
//     credentials: true,
//   }),
// );
authHandler.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export { authHandler };
