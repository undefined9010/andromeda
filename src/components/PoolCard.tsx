import { FC } from "react";
import AssetCard from "@/components/AssetCard.tsx";
import { DepositDialog } from "@/screens/AppScreens/Pools/components/Deposit/components/DepositDialog.tsx";
import { Address } from "viem";
import { PoolType } from "@/data/activePools.tsx";

type PoolCardProps = {
  item: PoolType;
};

const TOKEN_ADDRESSES: Record<string, Address> = {
  USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // Arbitrum USDT
  USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // Arbitrum USDC
  DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", //  Arbitrum DAI
};

export const PoolCard: FC<PoolCardProps> = ({ item }) => {
  const {
    date,
    coinName,
    icon,
    liquidity,
    isActive,
    ly_liq,
    ly_amount,
    fy_liq,
    fy_amount,
  } = item || {};

  const tokenAddress = TOKEN_ADDRESSES[item.coinName] || undefined;

  return (
    <div
      className={`relative w-full p-4 ${!isActive ? "grayscale-75 opacity-70" : ""} rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-xl shadow-lg border border-gray-700`}
    >
      <div className="absolute inset-0 rounded-2xl border-[20px] border-white/50 opacity-10 blur-lg -z-1"></div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
            {icon}
          </div>
          <h2 className="text-white text-base font-semibold">{coinName}</h2>
          <span className="text-gray-400 text-sm cursor-help">ⓘ</span>
        </div>
        <p className="text-gray-400 text-xs shrink-0">{date}</p>
      </div>

      <div className="mt-3 flex justify-between items-baseline">
        <div>
          <p className="text-gray-400 text-xs">Liquidity</p>
          <p className="text-white text-base font-semibold">{liquidity}</p>
        </div>
        {isActive && (
          <DepositDialog poolItem={item} tokenAddress={tokenAddress} />
        )}
      </div>

      <div>
        {/* LY Card */}
        <AssetCard
          label="LY"
          labelColor="text-blue-400"
          description="Liberating Yield APY"
          valueColor="text-green-400"
          value={ly_liq}
          price={ly_amount}
        />

        {/* FY Card */}
        <AssetCard
          label="FY"
          labelColor="text-green-400"
          description="Fixed Yield APR"
          valueColor="text-green-400"
          value={fy_liq}
          price={fy_amount}
        />
      </div>
    </div>
  );
};
