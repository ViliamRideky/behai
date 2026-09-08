import type { TrainingPlan, UserProfile } from "@/utils/types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function post(path: string, body: object) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Request failed");
  }

  return res.json();
}

async function get(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Request failed");
  }

  return res.json();
}

export const api = {
  saveProfile: (
    userId: string,
    profile: Omit<UserProfile, "userId" | "updatedAt">,
  ) => {
    return post("/api/profile", { userId, ...profile });
  },

  generatePlan: (userId: string) => {
    return post("/api/plan/generate", { userId });
  },

  getPlan: (userId: string): Promise<{ plan: TrainingPlan } | null> => {
    return get(`/api/plan/${userId}`);
  },
};
