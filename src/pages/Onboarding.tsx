import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { Label } from "@/components/ui/label";
import {
  goalOptions,
  experienceOptions,
  weeklyFrequencyOptions,
  injuryHistoryOptions,
} from "@/utils/options";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import type {
  Goal,
  Experience,
  InjuryHistory,
  WeeklyFrequency,
} from "@/utils/types";
import { useNavigate } from "react-router-dom";

const INJURY_OTHER = "other";

interface OnboardingFormData {
  goal: Goal | "";
  experience: Experience | "";
  frequency: WeeklyFrequency | "";
  injuries?: InjuryHistory | "";
  injuryDetails?: string;
}

const initialFormData: OnboardingFormData = {
  goal: "",
  experience: "",
  frequency: "",
  injuries: "",
  injuryDetails: "",
};

export const Onboarding = () => {
  const { user, saveProfile, generatePlan } = useAuth();
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updateField = <K extends keyof OnboardingFormData>(
    field: K, // nazov pola, ktore menime
    value: OnboardingFormData[K], // nova, hodnota, typo naviazana na dane pole
  ) => {
    setFormData((prev) => ({
      ...prev, // rozbal vsetky existujuce polia (aby sme neprisli o ostatne data)
      [field]: value, // prepis len to jedno pole, ktore aktualne menime
    }));
  };

  const handleQuestionnaire = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { goal, experience, frequency, injuries, injuryDetails } = formData;

    if (!goal || !experience || !frequency) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await saveProfile({
        goal,
        experience,
        frequency,
        injuries: injuries || undefined,
        injuryDetails: injuryDetails || undefined,
      });
      await generatePlan();
      navigate("/profile");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          {!isSubmitting ? (
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-2">
                Tell Us About Yourself
              </h1>
              <p className="text-muted-foreground mb-6">
                Help us create the perfect plan for you.
              </p>

              <form onSubmit={handleQuestionnaire} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="goal">What's your primary goal?</Label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) =>
                      updateField("goal", value as Goal)
                    }
                    required
                  >
                    <SelectTrigger id="goal" className="w-full">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Running experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) =>
                      updateField("experience", value as Experience)
                    }
                    required
                  >
                    <SelectTrigger id="experience" className="w-full">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Weekly running frequency</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) =>
                      updateField("frequency", value as WeeklyFrequency)
                    }
                    required
                  >
                    <SelectTrigger id="frequency" className="w-full">
                      <SelectValue placeholder="How often can you run?" />
                    </SelectTrigger>
                    <SelectContent>
                      {weeklyFrequencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="injuries">
                    Any injuries or limitations? (optional)
                  </Label>
                  <Select
                    value={formData.injuries}
                    onValueChange={(value) =>
                      updateField("injuries", value as InjuryHistory)
                    }
                  >
                    <SelectTrigger id="injuries" className="w-full">
                      <SelectValue placeholder="Select if applicable" />
                    </SelectTrigger>
                    <SelectContent>
                      {injuryHistoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.injuries === INJURY_OTHER && (
                  <div className="space-y-2">
                    <Label htmlFor="injuryDetails">
                      Tell us more about your injury
                    </Label>
                    <Textarea
                      id="injuryDetails"
                      maxLength={300}
                      placeholder="Briefly describe your injury or limitation"
                      value={formData.injuryDetails}
                      onChange={(e) =>
                        updateField("injuryDetails", e.target.value)
                      }
                    />
                  </div>
                )}
                {/* TODO vymazat, zatial na debugging */}
                {submitError && (
                  <p className="text-sm text-destructive">{submitError}</p>
                )}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 gap-2"
                    disabled={isSubmitting}
                  >
                    {"Generate my plan"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="py-16 text-center">
              <div>
                <Loader2 className="w-12 h-12 text-[var(--primary)] mx-auto mb-6 animate-spin" />
                <h1 className="text-2xl font-bold mb-2">
                  Generating your plan...
                </h1>
                <p className="text-muted-foreground">
                  Our Ai is building your personalized running plan.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </SignedIn>
  );
};
