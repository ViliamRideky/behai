import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, ...profileData } = req.body;
    const { goal, experience, frequency, injuries, injuryDetails } =
      profileData;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    if (!goal || !experience || !frequency) {
      return res.status(400).json({ error: "Missing required profile fields" });
    }

    await prisma.userProfile.upsert({
      where: { userId },
      create: {
        userId,
        goal,
        experience,
        frequency,
        injuries,
        injuryDetails,
      },
      update: {
        goal,
        experience,
        frequency,
        injuries,
        injuryDetails,
      },
    });

    return res.status(200).json({ message: "Profile saved successfully" });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
