import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Account } from "./pages/Account";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Onboarding } from "./pages/Onboarding";
import { Profile } from "./pages/Profile";
import { Navbar } from "./components/layout/Navbar";
import { PageBackground } from "./components/layout/PageBackground";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";
import { AuthProvider } from "./context/AuthContext";

const BackgroundLayout = () => (
  <>
    <PageBackground />
    <Outlet />
  </>
);

export const App = () => {
  return (
    <NeonAuthUIProvider authClient={authClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route index element={<Home />} />
                <Route element={<BackgroundLayout />}>
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/auth/:pathname" element={<Auth />} />
                  <Route path="/account/:pathname" element={<Account />} />
                </Route>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </NeonAuthUIProvider>
  );
};
