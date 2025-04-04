import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AssetCard from "@/components/AssetCard";
import { PoolType } from "@/data/activePools.tsx";

export type YieldData = {
  liq: string;
  amount: string;
  type: "LY" | "FY";
};

interface YieldSelectionViewProps {
  item: PoolType;
  onSelectYield: (yieldData: YieldData) => void;
}

export const YieldSelectionView: React.FC<YieldSelectionViewProps> = ({
  item,
  onSelectYield,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-white">Select Yield Type</DialogTitle>
        <DialogDescription className="text-white">
          Choose your preferred yield option for depositing {item.coinName}.
        </DialogDescription>
      </DialogHeader>
      <div className="pt-4 space-y-3">
        <div
          className="w-full cursor-pointer  hover:bg-gray-700/50 rounded-lg transition-colors"
          onClick={() =>
            onSelectYield({
              liq: item.ly_liq,
              amount: item.ly_amount,
              type: "LY",
            })
          }
        >
          <AssetCard
            label="LY"
            labelColor="text-blue-400"
            description="Liberating Yield APY"
            valueColor="text-green-400"
            value={item.ly_liq}
            price={item.ly_amount}
          />
        </div>
        <div
          className="w-full cursor-pointer  hover:bg-gray-700/50 rounded-lg transition-colors"
          onClick={() =>
            onSelectYield({
              liq: item.fy_liq,
              amount: item.fy_amount,
              type: "FY",
            })
          }
        >
          <AssetCard
            label="FY"
            labelColor="text-green-400"
            description="Fixed Yield APR"
            valueColor="text-green-400"
            value={item.fy_liq}
            price={item.fy_amount}
          />
        </div>
      </div>
    </>
  );
};
