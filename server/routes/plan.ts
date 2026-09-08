import { Router, type Request, type Response } from "express";
import OpenAI from "openai";
import { prisma } from "../lib/prisma";
import { generateTrainingPlan } from "../lib/ai";

export const planRouter = Router();

planRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId);

    const plan = await prisma.trainingPlan.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!plan) {
      return res.status(404).json({ error: "No plan found for this user" });
    }

    return res.status(200).json({ plan });
  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

    if (error instanceof OpenAI.APIError) {
      return res.status(503).json({
        error:
          "The AI model is temporarily unavailable. Please try again in a moment.",
      });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});
