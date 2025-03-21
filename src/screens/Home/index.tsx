import { AnimatePresence } from "framer-motion";
import { YieldContainer } from "@/components/YieldContainer.tsx";
import { FloatingPaths } from "@/components/Animation/FloatingPaths";
import { Hero } from "@/components/Hero";
import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { useConsent } from "@/hooks/useConsent.ts";
import { Consent } from "@/components/Consent.tsx";
import { useNavigate } from "react-router";
import { RoutePaths } from "@/router/routes.ts";

export const Home = () => {
  useConsent();

  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0F1C]">
        <Hero />
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-3} />
        </div>
        <div className="relative z-10 container mx-auto md:px-6 text-center">
        <div className="fixed w-screen bottom-[180px] mx-auto right-0 left-0">
        <YieldContainer />
            <div className="sm:hidden w-full flex justify-center pt-6">
              <ShimmerButton
                onClick={() => navigate(RoutePaths.DASHBOARD)}
                className="text-white"
              >
                <span className="text-white">Earn now</span>
              </ShimmerButton>
            </div>
          </div>
        </div>
        <Consent />
      </div>
    </AnimatePresence>
  );
};
