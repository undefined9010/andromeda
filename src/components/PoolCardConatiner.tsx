import { PoolCard } from "@/components/PoolCard.tsx";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";
import { ReactNode, useEffect } from "react";
import TetherIcon from "@/assets/coinIcons/tether-usdt-logo.svg?react";
import UsdcIcon from "@/assets/coinIcons/usdc-logo.svg?react";
import DaiIcon from "@/assets/coinIcons/dai-logo.svg?react";

export type PoolType = {
  chainId: string;
  icon: ReactNode;
  coinName: string;
  date: string;
  liquidity: string;
  isActive: boolean;
  ly_liq: string;
  ly_amount: string;
  fy_liq: string;
  fy_amount: string;
};

const activePools: PoolType[] = [
  {
    chainId: "13314",
    icon: <TetherIcon />,
    coinName: "USDT",
    date: "28 Sep 2025",
    liquidity: "$ 420.66M",
    ly_liq: "210%",
    ly_amount: "$0.9704",
    fy_liq: "148%",
    fy_amount: "$0.8323",
    isActive: true,
  },
  {
    chainId: "24214",
    icon: <UsdcIcon />,
    coinName: "USDC",
    date: "28 Sep 2025",
    liquidity: "$ 380.12M",
    ly_liq: "240%",
    ly_amount: "$0.4504",
    fy_liq: "194%",
    fy_amount: "0.8421",
    isActive: true,
  },
  {
    chainId: "63434",
    icon: <DaiIcon />,
    coinName: "DAI",
    date: "28 Sep 2025",
    liquidity: "$ 510.43M",
    ly_liq: "202%",
    ly_amount: "$0.5561",
    fy_liq: "232%",
    fy_amount: "$0.4728",
    isActive: true,
  },
  {
    chainId: "13523314",
    icon: <TetherIcon />,
    coinName: "USDT",
    date: "28 Sep 2024",
    liquidity: "$ 887.56M",
    ly_liq: "180%",
    ly_amount: "$1.2482",
    fy_liq: "199%",
    fy_amount: "$1.001",
    isActive: false,
  },
  {
    chainId: "2423514",
    icon: <UsdcIcon />,
    coinName: "USDC",
    date: "28 Sep 2024",
    liquidity: "$ 680.23M",
    ly_liq: "240%",
    ly_amount: "1200",
    fy_liq: "",
    fy_amount: "",
    isActive: false,
  },
  {
    chainId: "6345334",
    icon: <DaiIcon />,
    coinName: "DAI",
    date: "28 Sep 2024",
    ly_liq: "240%",
    ly_amount: "1200",
    fy_liq: "",
    fy_amount: "",
    liquidity: "$ 910.32M",
    isActive: false,
  },
];

export const PoolCardContainer = () => {
  const { isConnected } = useAccount();
  const { handleOpenModal } = useConnectWallet();

  useEffect(() => {
    if (!isConnected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isConnected]);

  return (
    <div className="relative h-full z-20">
      {!isConnected && (
        <div className="absolute z-50 top-1/4 sm:top-40 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center bg-black/50 text-white text-lg sm:text-xl font-semibold px-4 py-3 rounded-md mt-4 w-[90%] max-w-md">
          <p className="text-center font-[400]">Please connect your wallet</p>

          <div className="flex mt-3">
            <ShimmerButton
              onClick={handleOpenModal}
              className="text-white text-base h-10 w-full"
            >
              <span className="text-white font-[400] text-[14px]">
                Connect wallet
              </span>
            </ShimmerButton>
          </div>
        </div>
      )}
      <div
        className={`h-full ${!isConnected ? "blur-sm pointer-events-none" : ""}`}
      >
        <div className="block h-full sm:hidden overflow-y-auto pb-[100px]">
          <div className="flex flex-col gap-4 p-4 pb-6 min-h-screen">
            {activePools.map((item, index) => (
              <motion.div
                key={item.chainId}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "circIn",
                }}
              >
                <PoolCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden sm:grid h-full overflow-y-hidden sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
          {activePools.map((item, index) => (
            <motion.div
              key={item.chainId}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.3,
                ease: "circIn",
              }}
              className="w-full"
            >
              <PoolCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
