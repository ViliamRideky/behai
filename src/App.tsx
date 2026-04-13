import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Account } from "./pages/Account";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Onboarding } from "./pages/Onboarding";
import { Profile } from "./pages/Profile";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/:pathname" element={<Auth />} />
        <Route path="/account/:pathname" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};
