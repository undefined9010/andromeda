import { Deposit } from "@/screens/AppScreens/Pools/components/Deposit";
import { useState } from "react";
import AssetCard from "@/components/AssetCard.tsx";

export const PoolCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-xl shadow-lg border border-gray-700">
      <div className="absolute inset-0 rounded-2xl border-[20px] border-white/50 opacity-10 blur-lg -z-1"></div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
            💲
          </div>
          <h2 className="text-white text-base font-semibold">eUSDe</h2>
          <span className="text-gray-400 text-sm cursor-help">ⓘ</span>
        </div>
        <p className="text-gray-400 text-xs shrink-0">29 May 2025 (84 days)</p>
      </div>

      <div className="mt-3 flex justify-between items-baseline">
        <div>
          <p className="text-gray-400 text-xs">Liquidity</p>
          <p className="text-white text-base font-semibold">$104.92M</p>
        </div>
        <Deposit setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>

      <div>
        {/* YT Card */}
        <AssetCard
          label="YT"
          labelColor="text-blue-400"
          description="Long Yield APY"
          valueColor="text-red-400"
          value="-100%"
          price="$0.02905"
        />

        {/* PT Card */}
        <AssetCard
          label="PT"
          labelColor="text-green-400"
          description="Fixed APY"
          valueColor="text-green-400"
          value="13.63%"
          price="$0.9704"
        />
      </div>
    </div>
  );
};
