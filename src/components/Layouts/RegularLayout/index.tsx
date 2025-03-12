import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export const RegularLayout = () => {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
