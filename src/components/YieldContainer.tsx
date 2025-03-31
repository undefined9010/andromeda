import { YieldCard } from "@/components/YieldCard.tsx";
import useMediaQuery from "@/hooks/useMediaQuery.ts";
import { Link } from "react-router";
import { RoutePaths } from "@/router/routes.ts";
import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { PoolType } from "@/components/PoolCardConatiner.tsx";
import TetherIcon from "@/assets/coinIcons/tether-usdt-logo.svg?react";
import UsdcIcon from "@/assets/coinIcons/usdc-logo.svg?react";
import DaiIcon from "@/assets/coinIcons/dai-logo.svg?react";

export const YieldContainer = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  // const cards = isMobile ? [1] : [1, 2, 3];

  const cards: Omit<
    PoolType,
    "ly_liq" | "ly_amount" | "fy_liq" | "fy_amount"
  >[] = [
    {
      chainId: "13314",
      icon: (
        <TetherIcon
          className="filter text-glow drop-shadow-[0_0_10px_#fff] brightness-100"
          width="24px"
          height="24px"
        />
      ),
      coinName: "USDT",
      date: "28 Sep 2025",
      liquidity: "78.43%",
      isActive: true,
    },
    {
      chainId: "24214",
      icon: (
        <UsdcIcon
          className="filter text-glow drop-shadow-[0_0_10px_#fff] brightness-100"
          width="24px"
          height="24px"
        />
      ),
      coinName: "USDC",
      date: "28 Sep 2025",
      liquidity: "82.44%",
      isActive: true,
    },
    {
      chainId: "63434",
      icon: (
        <DaiIcon
          className="filter text-glow drop-shadow-[0_0_10px_#fff] brightness-100"
          width="24px"
          height="24px"
        />
      ),
      coinName: "DAI",
      date: "28 Sep 2025",
      liquidity: "66.34%",
      isActive: true,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl  sm:text-3xl md:text-4xl font-extralight  text-white mb-6 sm:mb-8">
        Liberating Yield
      </h1>

      {!isMobile ? (
        <div className="flex w-full max-w-[850px] gap-6 sm:gap-8 items-center justify-center sm:justify-between">
          {cards.map((card) => (
            <YieldCard key={card.chainId} {...card} />
          ))}
        </div>
      ) : (
        <div className="flex w-full max-w-[850px] gap-6 sm:gap-8 items-center justify-center sm:justify-between">
          <YieldCard {...cards[0]} />
        </div>
      )}
      <div className="hidden sm:flex">
        <Link to={RoutePaths.POOLS}>
          <ShimmerButton className="text-white w-[300px] mt-8 text-md ">
            <span className="text-white">Earn now</span>
          </ShimmerButton>
        </Link>
      </div>
    </div>
  );
};
