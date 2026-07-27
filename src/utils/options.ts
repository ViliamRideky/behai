export const goalOptions = [
  { value: "start_running", label: "Start running from scratch" },
  { value: "5k", label: "Run a 5k" },
  { value: "10k", label: "Run a 10k" },
  { value: "half_marathon", label: "Half marathon" },
  { value: "marathon", label: "Marathon" },
  { value: "weight_loss", label: "Weight loss" },
  { value: "general_fitness", label: "Improve overall fitness" },
] as const;

export const experienceOptions = [
  { value: "beginner", label: "Beginner (0-3 months running)" },
  { value: "casual", label: "Casual runner (3-12 months running)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced runner (3+ years)" },
] as const;

export const weeklyFrequencyOptions = [
  { value: "1-2", label: "1-2x per week" },
  { value: "3-4", label: "3-4x per week" },
  { value: "5+", label: "5x or more per week" },
] as const;

export const injuryHistoryOptions = [
  { value: "none", label: "No injuries" },
  { value: "knee", label: "Knee issues" },
  { value: "ankle", label: "Ankle issues" },
  { value: "back", label: "Back issues" },
  { value: "other", label: "Other" },
] as const;
