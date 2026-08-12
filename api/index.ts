import express, { type Express } from "express";
import cors from "cors";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
