import { Link, useLocation } from "react-router";
import LogoIcon from "@/assets/logo.svg?react";

import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { Bubbles } from "@/components/Animation/Bubbles.tsx";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";
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
  const { handleOpenModal } = useConnectWallet();
  const location = useLocation();

  return (
    <header className="w-full sticky top-0 sm:relative bg-transparent backdrop-blur-lg shadow-lg text-white p-4 z-10">
      <Bubbles />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <nav className="hidden md:flex w-full justify-end items-center space-x-6">
            <div className="text-2xl font-bold">
              <Link to="/" className="cursor-pointer">
                <LogoIcon className="pointer-events-auto" />
              </Link>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-teal-400 text-md transition-colors ${
                  location.pathname === item.path
                    ? "text-teal-400"
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:flex">
            <ShimmerButton
              onClick={handleOpenModal}
              className="text-white text-xl h-[40px] sm:h-[52px] md:ml-[120px]"
            >
              <span className="text-white text-[14px] sm:text-[16px]">
                Connect wallet
              </span>
            </ShimmerButton>
          </div>
        </div>
      </div>

      <nav className="md:hidden flex w-full justify-end items-center space-x-6 px-6 ">
        <div className="text-2xl font-bold">
          <Link to="/" className="cursor-pointer">
            <LogoIcon className="pointer-events-auto" />
          </Link>
        </div>
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
    </header>
  );
};
