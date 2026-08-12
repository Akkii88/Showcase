import app from "../artifacts/api-server/src/app";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel strips the `/api` function prefix from req.url, but the Express
  // app mounts routes under `/api`. Re-add it so paths resolve in both
  // local (prefix kept) and Vercel (prefix stripped) environments.
  if (req.url && !req.url.startsWith("/api")) {
    req.url = `/api${req.url === "/" ? "" : req.url}`;
  }
  return app(req, res);
}
