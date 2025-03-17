import { AppHeader } from "@/components/AppHeader";
import { Outlet } from "react-router";
import { Footer } from "@/components/Footer";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <div className="max-w-[1550px] mx-auto">
        <AppHeader />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
