import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import type { TrainingPlan } from "@/utils/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const { user, isLoading, getPlan } = useAuth();
  const [plan, setPlan] = useState<TrainingPlan | null | undefined>(undefined);

  useEffect(() => {
    if (!user) return;

    getPlan()
      .then(setPlan)
      .catch(() => setPlan(null));
  }, [user, getPlan]);

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (plan === undefined) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!plan) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-2">Your Training Plan</h1>
          <p className="text-muted-foreground">{plan.planJson.overview}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Schedule</h2>
          <ul className="space-y-3">
            {plan.planJson.weeklySchedule.map((day) => (
              <li key={day.day} className="flex justify-between gap-4">
                <span className="font-medium">{day.day}</span>
                <span className="text-muted-foreground text-right">
                  {day.workout}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Progression</h2>
          <p className="text-muted-foreground">{plan.planJson.progression}</p>
        </Card>
      </div>
    </div>
  );
};
