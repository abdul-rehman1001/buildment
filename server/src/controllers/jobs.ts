import type { Request, Response } from "express";
import { ok } from "../utils/responses.js";
import { runInactivityNudges } from "../services/jobs/inactivity-nudges.js";
import { pruneAppActivity } from "../services/activity/app-activity.js";

// POST /api/v1/jobs/inactivity-nudge — triggered by an external scheduler.
export async function inactivityNudge(_req: Request, res: Response) {
  ok(res, await runInactivityNudges());
}

// POST /api/v1/jobs/app-activity-cleanup — deletes daily app-activity rows past retention.
export async function appActivityCleanup(_req: Request, res: Response) {
  ok(res, await pruneAppActivity());
}
