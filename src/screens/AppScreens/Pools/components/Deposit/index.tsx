import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Web3 from "web3";

import { FC, useState } from "react";
import AssetCard from "@/components/AssetCard.tsx";
import { DepositForm } from "@/screens/AppScreens/Pools/components/DepositForm.tsx";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";
import { PoolType } from "@/components/PoolCardConatiner.tsx";

type DepositProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: (prev: boolean) => boolean) => void;
  item: PoolType;
};

export const Deposit: FC<DepositProps> = ({ isOpen, setIsOpen, item }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const { transferTokens, approveTokens } = useConnectWallet();

  const web3 = new Web3(
    `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  );
  const tokenAmount = web3.utils.toWei(10, "mwei");

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger>
        <Button
          // onClick={() => transferTokens(tokenAmount)}
          onClick={approveTokens}
          className="cursor-pointer px-4 py-1.5 bg-gradient-to-r hover:from-teal-200 from-teal-400 to-teal-600 text-white rounded-full text-xs font-medium hover:opacity-50 transition-opacity shrink-0"
          variant="default"
        >
          Deposit
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full md:min-w-[500px] p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-lg shadow-lg border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Deposit</DialogTitle>
          <DialogDescription className="text-white">
            Please make your choice
          </DialogDescription>
        </DialogHeader>

        <div>
          {selectedAsset === null ? (
            <>
              <div className="w-full" onClick={() => setSelectedAsset("YT")}>
                <AssetCard
                  label="LY"
                  labelColor="text-blue-400"
                  description="Lieberating Yield APY"
                  valueColor="text-green-400"
                  value={item.ly_liq}
                  price={item.ly_amount}
                />
              </div>

              <div className="w-full" onClick={() => setSelectedAsset("PT")}>
                <AssetCard
                  label="FY"
                  labelColor="text-green-400"
                  description="Fixed Yield APY"
                  valueColor="text-green-400"
                  value={item.fy_liq}
                  price={item.fy_amount}
                />
              </div>
            </>
          ) : (
            <DepositForm />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
