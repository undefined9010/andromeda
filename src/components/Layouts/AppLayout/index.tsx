import { Footer } from "@/components/Footer";
import { AppHeader } from "@/components/AppHeader";
import { Outlet, useLocation } from "react-router";

export const AppLayout = () => {
  const location = useLocation();
  const hideFooterPaths = ['/app/pools', '/app/dashboard'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <AppHeader />
      <Outlet />
      {shouldShowFooter && <Footer />}
    </div>
  );
};
