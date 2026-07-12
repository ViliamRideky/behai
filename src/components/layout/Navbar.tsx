import { SportShoe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { UserButton } from "@neondatabase/neon-js/auth/react";

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-black)]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-[var(--color-foreground)]"
        >
          <SportShoe className="w-6 h-6 text-[var(--color-accent)]" />
          <span className="font-semibold text-lg">BehAI</span>
        </Link>

        <nav>
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="lg" className="px-6 text-base">
                  My Plan
                </Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button variant="ghost" size="lg" className="px-6 text-base">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button size="lg" className="px-6 text-base">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
