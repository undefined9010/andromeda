import { AppHeader } from "@/components/AppHeader";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <AppHeader />
      <Outlet />
    </div>
  );
};
