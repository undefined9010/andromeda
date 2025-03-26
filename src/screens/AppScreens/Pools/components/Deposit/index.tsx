import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Web3 from "web3";

import { FC, useState } from "react";
import AssetCard from "@/components/AssetCard.tsx";
import { DepositForm } from "@/screens/AppScreens/Pools/components/DepositFrom.tsx";
import { injected, useAccount, useConnect, useWriteContract } from "wagmi";
import { getAddress, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";

const USDT_ADDRESS = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // Replace with actual USDT contract address
const USDT_ABI = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    type: "function",
  },
];

type DepositProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: (prev: boolean) => boolean) => void;
};

export const Deposit: FC<DepositProps> = ({ isOpen, setIsOpen }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const { transferTokens } = useConnectWallet();

  const web3 = new Web3(
    `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  );
  const tokenAmount = web3.utils.toWei(10, "mwei");

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <Button
        onClick={() => transferTokens(tokenAmount)}
        className="cursor-pointer px-4 py-1.5 bg-gradient-to-r hover:from-teal-200 from-teal-400 to-teal-600 text-white rounded-full text-xs font-medium hover:opacity-50 transition-opacity shrink-0"
        variant="default"
      >
        Deposit
      </Button>

      <DialogContent className="max-w-[425px] p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-xl shadow-lg border border-gray-700">
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
                  label="YT"
                  labelColor="text-blue-400"
                  description="Lieberating Yield APY"
                  valueColor="text-red-400"
                  value="-100%"
                  price="$0.02905"
                />
              </div>

              <div className="w-full" onClick={() => setSelectedAsset("PT")}>
                <AssetCard
                  label="PT"
                  labelColor="text-green-400"
                  description="Fixed Yield APY"
                  valueColor="text-green-400"
                  value="13.63%"
                  price="$0.9704"
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
