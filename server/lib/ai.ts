import OpenAI from "openai";
import type { TrainingPlan, UserProfile } from "../types";
import type { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions";

type OpenRouterChatCompletionParams = ChatCompletionCreateParamsNonStreaming & {
  models?: string[];
};

export async function generateTrainingPlan(
  profile: UserProfile,
): Promise<Omit<TrainingPlan, "id" | "version" | "createdAt">> {
  const apiKey = process.env.OPEN_ROUTER_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is not set in environment variables");
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.BASE_URL || "http://localhost:3001",
      "X-Title": "Behai",
    },
  });

  const prompt = buildPrompt(profile);

  const completion = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    models: [
      "inclusionai/ling-3.0-flash:free",
      "nvidia/nemotron-nano-9b-v2:free",
    ],
    messages: [
      {
        role: "system",
        content:
          "You are an expert running coach who creates safe, progressive, and personalized running training plans. You always respond with valid JSON only, no markdown formatting, no code fences, no explanations outside the JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  } as OpenRouterChatCompletionParams);

  const raw = completion.choices[0]?.message?.content;

  if (!raw) {
    throw new Error("AI did not return a training plan");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("AI returned invalid JSON");
  }

  return formatPlanResponse(parsed, profile);
}

function formatPlanResponse(
  aiResponse: any,
  profile: UserProfile,
): Omit<TrainingPlan, "id" | "version" | "createdAt"> {
  return {
    userId: profile.userId,
    overview: aiResponse.overview,
    weeklySchedule: aiResponse.weeklySchedule,
    progression: aiResponse.progression,
  };
}

function buildPrompt(profile: UserProfile): string {
  const injuries =
    profile.injuries && profile.injuries !== "none"
      ? `${profile.injuries}${profile.injuryDetails ? ` - ${profile.injuryDetails}` : ""}`
      : "None reported";

  return `
Create a personalized 4-week running training plan for a runner with the following profile:

- Goal: ${profile.goal}
- Experience level: ${profile.experience}
- Available training frequency: ${profile.frequency} runs per week
- Injuries or physical limitations: ${injuries}

Guidelines for the plan:
- Respect the runner's experience level - do not prescribe workouts beyond their current capability.
- If injuries are reported, include appropriate modifications, lower-impact alternatives, or rest emphasis for the affected area.
- Follow a sensible weekly progression (avoid increasing total weekly volume by more than ~10% week over week).
- Include a mix of easy runs, and where appropriate for the goal and experience level, workouts such as tempo runs, intervals, or long runs.
- Include at least one rest or cross-training day per week.
- Keep workout descriptions concise but specific (e.g. include approximate distance or duration, and effort level).

Respond with a single JSON object matching exactly this structure, and nothing else:

{
  "overview": "string - a 2-3 sentence summary of the plan's approach and what the runner should expect",
  "weeklySchedule": [
    {
      "day": "string - e.g. Monday",
      "workout": "string - description of the workout for that day, or 'Rest' or 'Cross-training'"
    }
  ],
  "progression": "string - explanation of how the plan progresses week to week and what to adjust if it feels too easy or too hard"
}
`.trim();
}
