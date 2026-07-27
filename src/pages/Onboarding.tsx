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

const INJURY_OTHER = "other";

interface OnboardingFormData {
  goal: string;
  experience: string;
  frequency: string;
  injuries?: string;
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
  const { user } = useAuth();
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);

  const updateField = <K extends keyof OnboardingFormData>(
    field: K, // nazov pola, ktore menime
    value: OnboardingFormData[K], // nova, hodnota, typo naviazana na dane pole
  ) => {
    setFormData((prev) => ({
      ...prev, // rozbal vsetky existujuce polia (aby sme neprisli o ostatne data)
      [field]: value, // prepis len to jedno pole, ktore aktualne menime
    }));
  };

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-2">Tell Us About Yourself</h1>
            <p className="text-muted-foreground mb-6">
              Help us create the perfect plan for you.
            </p>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal">What's your primary goal?</Label>
                <Select
                  value={formData.goal}
                  onValueChange={(value) => updateField("goal", value)}
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
                  onValueChange={(value) => updateField("experience", value)}
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
                  onValueChange={(value) => updateField("frequency", value)}
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
                  onValueChange={(value) => updateField("injuries", value)}
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
            </form>
          </Card>
        </div>
      </div>
    </SignedIn>
  );
};
