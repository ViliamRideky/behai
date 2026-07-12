import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const { user, isLoading } = useAuth();
  const plan = false; // placeholder --- IGNORE ---

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (!plan) {
    return <Navigate to="/onboarding" replace />;
  }

  return <h1 className="text-3xl font-bold text-center mt-32">Profile Page</h1>;
};
