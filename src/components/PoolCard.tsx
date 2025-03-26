import { Deposit } from "@/screens/AppScreens/Pools/components/Deposit";
import { FC, useState } from "react";
import AssetCard from "@/components/AssetCard.tsx";
import { PoolType } from "@/components/PoolCardConatiner.tsx";

type PoolCardProps = {
  item: PoolType;
};

export const PoolCard: FC<PoolCardProps> = ({ item }) => {
  const { date, coinName, icon, liquidity, isActive } = item || {};
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative w-full p-4 ${!isActive ? "grayscale-75 opacity-70" : ""} rounded-2xl bg-gradient-to-br "from-gray-800/20 to-gray-900/10 backdrop-blur-xl shadow-lg border border-gray-700`}
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
        <Deposit setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>

      <div>
        {/* YT Card */}
        <AssetCard
          label="LY"
          labelColor="text-blue-400"
          description="Liberating Yield APY"
          valueColor="text-red-400"
          value="-100%"
          price="$0.02905"
        />

        {/* PT Card */}
        <AssetCard
          label="FY"
          labelColor="text-green-400"
          description="Fixed Yield APY"
          valueColor="text-green-400"
          value="13.63%"
          price="$0.9704"
        />
      </div>
    </div>
  );
};
