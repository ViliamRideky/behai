import { api } from "@/lib/api";
import { authClient } from "@/lib/auth";
import type { User, UserProfile } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  saveProfile: (data: Omit<UserProfile, "userId">) => Promise<void>;
}

// interface AuthProviderProps {
//     children: React.ReactNode
// }

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [neonUser, setNeonUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          setNeonUser(result.data.user);
        } else {
          setNeonUser(null);
        }
      } catch (err) {
        setNeonUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const saveProfile = async (profileData: Omit<UserProfile, "userId">) => {
    if (!neonUser) {
      throw new Error("Cannot save profile: user is not authenticated");
    }

    await api.saveProfile(neonUser.id, profileData);
  };

  return (
    <AuthContext.Provider value={{ user: neonUser, isLoading, saveProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
