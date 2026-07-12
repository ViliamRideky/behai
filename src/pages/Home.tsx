import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    return <Navigate to="/profile" replace />;
  }

  return <div>Home page</div>;
};
