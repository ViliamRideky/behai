import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { generateTrainingPlan } from "../lib/ai";
import { UserProfile } from "../types";

export const planRouter = Router();

planRouter.post("/generate", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const latestPlan = await prisma.trainingPlan.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { version: true },
    });

    const nextVersion = latestPlan ? latestPlan.version + 1 : 1;

    const generatedPlan = await generateTrainingPlan(profile);

    const planJson = {
      overview: generatedPlan.overview,
      weeklySchedule: generatedPlan.weeklySchedule,
      progression: generatedPlan.progression,
    };
    const planText = JSON.stringify(planJson, null, 2);

    const newPlan = await prisma.trainingPlan.create({
      data: {
        userId,
        version: nextVersion,
        planJson: planJson as object,
        planText,
      },
    });

    return res
      .status(200)
      .json({ message: "Plan generated successfully", plan: newPlan });
  } catch (error) {
    console.error("Error generating plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
