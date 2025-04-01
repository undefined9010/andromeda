// components/Deposit.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState, useEffect } from "react"; // Import useState
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";
import { PoolType } from "@/components/PoolCardConatiner.tsx";
import { useYieldsStore } from "@/stores/deposit-form-store.ts";
import LoaderOne from "@/components/ui/loader-one.tsx";
import AssetCard from "@/components/AssetCard.tsx";
import { DepositForm } from "@/screens/AppScreens/Pools/components/DepositForm.tsx";
import { MaxUint256 } from "ethers";

type DepositProps = {
  // Remove isOpen and setIsOpen if Dialog manages its own state via trigger/onOpenChange
  // isOpen: boolean;
  // setIsOpen: (item: boolean) => void;
  item: PoolType;
};

// export const Deposit: FC<DepositProps> = ({ isOpen, setIsOpen, item }) => {
export const Deposit: FC<DepositProps> = ({ item }) => {
  const { yieldsData, setYieldsData } = useYieldsStore();
  const {
    approveTokens,
    isApproving,
    hasSufficientAllowance,
    isCheckingAllowance,
    refetchAllowance,
    isConnected,
    handleOpenModal: openConnectModal, // Rename for clarity if needed
    contractWriteError,
  } = useConnectWallet();

  const [internalIsOpen, setInternalIsOpen] = useState(false); // Manage dialog visibility internally
  const [showFormContent, setShowFormContent] = useState(false); // Control showing form/assets
  const [currentError, setCurrentError] = useState<string | null>(null);

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      // Reset state when dialog closes
      setYieldsData(null);
      setShowFormContent(false);
      setCurrentError(null);
    }
    setInternalIsOpen(open);
  };

  const handleDepositClick = async () => {
    setCurrentError(null); // Clear previous errors

    if (!isConnected) {
      openConnectModal(); // Ask user to connect wallet first
      return;
    }

    // Open the dialog immediately to show loading/checking state
    handleDialogChange(true);
    setShowFormContent(false); // Ensure form isn't shown initially

    // Force a refresh of the allowance check
    console.log("Refetching allowance...");
    const { data: currentAllowance, isError, error } = await refetchAllowance();

    if (isError) {
      console.error("Failed to check allowance:", error);
      setCurrentError("Failed to check token allowance. Please try again.");
      // Optionally close dialog: handleDialogChange(false);
      return; // Stop execution
    }

    const sufficient = !!currentAllowance && currentAllowance === MaxUint256;
    console.log(
      "Allowance check complete. Sufficient:",
      sufficient,
      "Allowance:",
      currentAllowance?.toString(),
    );

    if (sufficient) {
      console.log("Allowance sufficient. Showing deposit options.");
      setShowFormContent(true); // Already approved, show the form content
    } else {
      console.log("Allowance insufficient. Requesting approval.");
      // Need to approve. Keep form hidden for now.
      // The dialog is already open and will show the isApproving loader.
      approveTokens(
        () => {
          // onSuccess Callback
          console.log("Approval successful. Showing deposit options.");
          setShowFormContent(true); // Show form after approval is successful
          setCurrentError(null);
        },
        (approvalError) => {
          // onError Callback
          console.error("Approval failed or rejected:", approvalError);
          setCurrentError(
            `Approval failed: ${approvalError.message}. Please try again.`,
          );
          // Close the dialog on failure/rejection
          handleDialogChange(false);
        },
      );
    }
  };

  // Effect to clear yieldsData if user switches selection (or handle elsewhere)
  useEffect(() => {
    if (!internalIsOpen) {
      setYieldsData(null);
    }
  }, [internalIsOpen, setYieldsData]);

  // Effect to display contract write errors that aren't handled by callbacks
  useEffect(() => {
    if (contractWriteError) {
      setCurrentError(`Transaction Error: ${contractWriteError.message}`);
      // Decide if dialog should close here too
      // handleDialogChange(false);
    }
  }, [contractWriteError]);

  const renderDialogContent = () => {
    // Show error message first if present
    if (currentError) {
      return (
        <div className="h-[200px] flex flex-col gap-4 items-center justify-center text-red-400">
          <DialogHeader>
            <DialogTitle className="text-white">Error</DialogTitle>
          </DialogHeader>
          <p>{currentError}</p>
          <Button
            onClick={() => handleDialogChange(false)}
            variant="destructive"
          >
            Close
          </Button>
        </div>
      );
    }

    // Show loading states
    if (isCheckingAllowance || isApproving) {
      return (
        <div className="h-[200px] flex gap-8 flex-col items-center justify-center">
          <DialogHeader>
            <DialogDescription className="text-white">
              {isCheckingAllowance
                ? "Checking token allowance..."
                : "Please confirm the approval in your wallet..."}
            </DialogDescription>
          </DialogHeader>
          <LoaderOne />
        </div>
      );
    }

    // If not loading and form content should be shown
    if (showFormContent) {
      return (
        <>
          <DialogHeader>
            <DialogTitle className="text-white">Deposit</DialogTitle>
            <DialogDescription className="text-white">
              Please make your choice
            </DialogDescription>
          </DialogHeader>
          <div>
            {yieldsData === null ? (
              <>
                <div
                  className="w-full cursor-pointer p-2 hover:bg-gray-700/50 rounded-lg transition-colors" // Add interaction feedback
                  onClick={() =>
                    setYieldsData({
                      liq: item.ly_liq,
                      amount: item.ly_amount,
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
                  className="w-full cursor-pointer p-2 hover:bg-gray-700/50 rounded-lg transition-colors" // Add interaction feedback
                  onClick={() =>
                    setYieldsData({
                      liq: item.fy_liq,
                      amount: item.fy_amount,
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
              </>
            ) : (
              // Assuming DepositForm handles the actual deposit transaction
              <DepositForm />
            )}
          </div>
        </>
      );
    }

    // Fallback case (should ideally not be reached if logic is sound)
    return (
      <div className="h-[200px] flex items-center justify-center">
        <DialogDescription className="text-white">
          Preparing deposit options...
        </DialogDescription>
      </div>
    );
  };

  return (
    <Dialog open={internalIsOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        {/* Disable button while checking or approving */}
        <Button
          onClick={handleDepositClick}
          className="cursor-pointer px-4 py-1.5 bg-gradient-to-r hover:from-teal-200 from-teal-400 to-teal-600 text-white rounded-full text-xs font-medium hover:opacity-50 transition-opacity shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          variant="default"
          disabled={isCheckingAllowance || isApproving}
        >
          {isCheckingAllowance
            ? "Checking..."
            : isApproving
              ? "Approving..."
              : "Deposit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[300px] md:min-w-[500px] p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-lg shadow-lg border border-gray-700">
        {/* Render content dynamically */}
        {renderDialogContent()}
        {/* Optional: Explicit close button if needed, though onOpenChange handles overlay click etc. */}
        {/* <DialogClose asChild><Button variant="ghost">Close</Button></DialogClose> */}
      </DialogContent>
    </Dialog>
  );
};
