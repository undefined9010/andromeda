import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import AssetCard from "@/components/AssetCard.tsx";
import { useConnectWallet } from "@/hooks/useConnectWallet";
import { DepositForm } from "@/screens/AppScreens/Pools/components/DepositFrom.tsx";

type DepositProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: (prev: boolean) => boolean) => void;
};

export const Deposit: FC<DepositProps> = ({ isOpen, setIsOpen }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const { transferTokens } = useConnectWallet();

  // Handle card selection
  const handleSelectAsset = (asset: string) => {
    setSelectedAsset(asset);
  };

  // Handle input change
  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   // Handle input change logic here
  //   console.log(e.target.value);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      {/*<DialogTrigger asChild className="cursor-pointer">*/}
      <Button
        onClick={() => transferTokens("0.25")}
        className="cursor-pointer px-4 py-1.5 bg-gradient-to-r hover:from-teal-200 from-teal-400 to-teal-600 text-white rounded-full text-xs font-medium hover:opacity-50 transition-opacity shrink-0"
        variant="default"
      >
        Deposit
      </Button>
      {/*</DialogTrigger>*/}
      <DialogContent className="max-w-[425px]  p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-xl shadow-lg border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Deposit</DialogTitle>
          <DialogDescription className="text-white">
            Please make your choice
          </DialogDescription>
        </DialogHeader>

        <div>
          {selectedAsset === null ? (
            <>
              <div className="w-full" onClick={() => handleSelectAsset("YT")}>
                <AssetCard
                  label="YT"
                  labelColor="text-blue-400"
                  description="Lieberating Yield APY"
                  valueColor="text-red-400"
                  value="-100%"
                  price="$0.02905"
                />
              </div>

              <div className="w-full" onClick={() => handleSelectAsset("PT")}>
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
