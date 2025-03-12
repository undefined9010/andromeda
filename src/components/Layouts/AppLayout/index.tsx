import { Footer } from "@/components/Footer";
import { Outlet } from "react-router";
import { AppHeader } from "@/components/AppHeader";

export const AppLayout = () => {
  return (
    <div className="flex flex-col max-h-[100vh]">
      <AppHeader />
      <main className="flex-1 overflow-hidden w-full max-w-[1440px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
