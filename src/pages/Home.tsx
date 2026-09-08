import { Link, Navigate } from "react-router-dom";
import {
  Sparkles,
  Target,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Plans",
    description:
      "Get a running program tailored to your goal, experience, and weekly schedule.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Training for your first 5k, a new marathon PB, or just building the habit — we optimize for it.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Plans that fit your life. Run 2 days a week or 6 — we adapt to you.",
  },
  {
    icon: ShieldCheck,
    title: "Injury-Aware",
    description:
      "Tell us about past injuries and we'll build a plan that trains around them safely.",
  },
];

export const Home = () => {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-200 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI-powered running plans
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Your Perfect
            <br />
            <span className="text-primary">Running Plan</span> in Seconds
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop guessing your training. Get a personalized running plan built
            by AI, tailored to your goal, experience, and schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="gap-2 px-6 text-base">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth/sign-in">
              <Button variant="outline" size="lg" className="px-6 text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Behai?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine running coach expertise with AI to build plans that
              actually work for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 group hover:ring-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
