import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { Bubbles } from "@/components/Animation/Bubbles.tsx";
import { useMainPage } from "@/hooks/useMainPage.ts";
import { RoutePaths } from "@/router/routes.ts";

const navItems = [
  {
    path: RoutePaths.POOLS,
    name: "Pools",
  },
  {
    path: RoutePaths.DASHBOARD,
    name: "Dashboard",
  },
];

export const AppHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleOpenModal } = useMainPage();
  const location = useLocation();

  return (
    <header className="w-full relative bg-transparent backdrop-blur-lg shadow-lg text-white p-4 z-10">
      <Bubbles />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">
            {/*<Link to="/">MySite</Link>*/}
          </div>

          <nav className="hidden md:flex w-full justify-end items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-teal-400 text-xl transition-colors ${
                  location.pathname === item.path ? "text-teal-400" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <ShimmerButton
            onClick={handleOpenModal}
            className="text-white text-xl sm:[100px] md:ml-[120px]"
          >
            <span className="text-white">Connect wallet</span>
          </ShimmerButton>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <motion.div
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMobileMenuOpen ? (
                  <IoCloseOutline size={28} />
                ) : (
                  <FiMenu size={28} />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden w-full gap-4 rounded-xl absolute top-0 py-8 bg-[#07c1b610] backdrop-blur-sm flex flex-col justify-center items-center -z-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: -15 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-xl hover:text-teal-400 transition-colors ${
                  location.pathname === item.path ? "text-teal-400" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
