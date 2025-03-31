import { Link, useLocation } from "react-router";
import LogoIcon from "@/assets/logo.png";

import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { Bubbles } from "@/components/Animation/Bubbles.tsx";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";
import { RoutePaths } from "@/router/routes.ts";
import { useAccount, useBalance } from "wagmi";
import { Menubar, MenubarContent } from "../ui/menubar";
import { MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";
import { BadgeCheck } from "lucide-react";
import { FC } from "react";

const navItems = [
  {
    path: RoutePaths.HOME,
    name: "Home",
  },
  {
    path: RoutePaths.POOLS,
    name: "Pools",
  },
  {
    path: RoutePaths.DASHBOARD,
    name: "Dashboard",
  },
];

type Balance = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};

export const WalletMenu: FC<{
  status: string;
  chain: string;
  address: string;
  handleDisconnect: VoidFunction;
  balance?: Balance | undefined;
}> = ({ status, chain, address, balance, handleDisconnect }) => {
  return (
    <Menubar className="bg-transparent border-0 ">
      <MenubarMenu>
        <MenubarTrigger className="ml-9 cursor-pointer border rounded-lg px-4 py-2 relative capitalize font-medium text-white animate-pulse text-sm sm:text-md">
          <div className="flex gap-2">
            <span className="bg-gradient-to-r from-teal-200 to-teal-600 bg-clip-text text-transparent">
              {status}
            </span>
            <BadgeCheck className="h-5" />
          </div>
        </MenubarTrigger>
        <MenubarContent className="backdrop-blur-2xl bg-[#6e89e010] py-3 px-4 mr-8  md:px-6 md:py-4 border-0">
          <div className="flex-col gap-3 flex">
            <p className="text-sm text-white hidden sm:flex">
              Chain:
              <span className="text-teal-400 animate-pulse ml-2"> {chain}</span>
            </p>
            <p className="text-sm text-white hidden sm:flex">
              Wallet:
              <span className="text-teal-400 animate-pulse ml-2">
                {address}
              </span>
            </p>
            <p className="text-sm text-white hidden sm:flex">
              Balance:
              <span className="text-teal-400 animate-pulse ml-2">
                <p>
                  {balance ? `${balance.formatted} ${balance.symbol}` : "0"}
                </p>
              </span>
            </p>

            <p
              onClick={handleDisconnect}
              className="text-sm text-white cursor-pointer"
            >
              <span className="text-teal-400 animate-pulse">Sign out</span>
            </p>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export const AppHeader = () => {
  const { isConnected, chain, status, address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const { handleOpenModal, handleDisconnect } = useConnectWallet();
  const location = useLocation();

  return (
    <header className="w-full sticky top-0 sm:relative bg-transparent backdrop-blur-lg shadow-lg text-white z-10 flex items-center">
      <Bubbles />

      <div className="max-w-[1920px] hidden sm:flex mx-auto px-4 sm:px-6 lg:px-8 w-full justify-between items-center py-4">
        {/* Main nav (desktop) */}
        <nav className="hidden md:flex w-full justify-between items-center">
          <div className="flex gap-6 items-center">
            <Link to="/" className="cursor-pointer">
              <img src={LogoIcon} alt="Logo" className="h-8" />
            </Link>
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
          </div>
        </nav>

        {!isConnected ? (
          <div className="hidden sm:flex items-center">
            <ShimmerButton
              onClick={handleOpenModal}
              className="text-white text-xl h-[40px] sm:h-[52px] md:ml-[120px]"
            >
              <span className="text-white text-[14px] sm:text-[16px]">
                Connect wallet
              </span>
            </ShimmerButton>
          </div>
        ) : (
          <WalletMenu
            handleDisconnect={handleDisconnect}
            status={status}
            chain={chain?.name ?? ""}
            address={address ?? ""}
            balance={balance}
          />
        )}
      </div>

      <nav className="md:hidden relative py-4 flex w-full justify-between items-center px-6">
        <Link to="/" className="cursor-pointer">
          <img src={LogoIcon} alt="Logo" className="h-8 w-8" />
        </Link>

        <div className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-teal-400 text-md transition-colors font-[400] ${
                location.pathname === item.path ? "text-teal-400" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
