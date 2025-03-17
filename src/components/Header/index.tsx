import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { RoutePaths } from "@/router/routes.ts";
import LogoIcon from "@/assets/logo.png";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";
import { WalletMenu } from "@/components/AppHeader";
import { useAccount } from "wagmi";

const navItems = [
  {
    path: RoutePaths.DASHBOARD,
    name: "Dashboard",
  },
  {
    path: RoutePaths.POOLS,
    name: "Pools",
  },
  {
    path: RoutePaths.HOME,
    name: "Docs",
  },
  {
    path: RoutePaths.HOME,
    name: "Education",
  },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleOpenModal, handleDisconnect } = useConnectWallet();
  const { isConnected, chain, address, status } = useAccount();

  const isSoon = (item: { name: string }) =>
    item.name === "Docs" || item.name === "Education";

  return (
    <header className="text-white fixed top-0 w-full z-9999">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <nav className="hidden md:flex w-full justify-start items-center space-x-6">
            <Link to="/" className="cursor-pointer">
              <img src={LogoIcon} alt="Logo" className="h-8" />
            </Link>
            {navItems.map((item) => (
              <div className="flex gap-1">
                <Link to={item.path} className="hover:text-teal-400 text-md">
                  {item.name}
                </Link>
                {isSoon(item) && (
                  <div className="rounded-lg px-1 w-fit h-fit bg-white">
                    <p className="text-black text-[8px]">soon</p>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden sm:flex">
            <div>
              {!isConnected ? (
                <ShimmerButton
                  onClick={handleOpenModal}
                  className="text-white text-md ml-[120px]"
                >
                  <span className="text-white">Connect wallet</span>
                </ShimmerButton>
              ) : (
                <WalletMenu
                  handleDisconnect={handleDisconnect}
                  status={status}
                  chain={chain?.name ?? ""}
                  address={address ?? ""}
                />
              )}
            </div>
          </div>

          <div className="md:hidden z-[9999]">
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
            className="md:hidden w-full gap-2 pt-[50px] rounded-xl absolute top-0 py-4 bg-[#07c1b610] backdrop-blur-sm flex flex-col justify-center items-center z-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: -15 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <div className="flex gap-1 relative">
                <Link to={item.path} className="hover:text-teal-400 text-md">
                  {item.name}
                </Link>
                {isSoon(item) && (
                  <div
                    style={{ left: index === 2 ? "45px" : "85px", top: "4px" }}
                    className="absolute rounded-lg px-1 w-fit h-fit bg-white"
                  >
                    <p className="text-black text-[8px]">soon</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
