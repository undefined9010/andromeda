import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DepositForm } from "@/screens/AppScreens/Pools/components/DepositForm";
import { useTokenApproval } from "@/hooks/useTokenApproval";
import { useDepositDialog } from "@/hooks/useDepositDialog";
import { YieldData, YieldSelectionView } from "./YieldSelectionView";
import LoaderOne from "@/components/ui/loader-one";
import type { Address } from "viem";
import { PoolType } from "@/data/activePools.tsx";

const SPENDER_ADDRESS = (import.meta.env.VITE_SPENDER_ADDRESS ||
  "0x17E332631Eab05d8037B38c1b6BE784bd638B931") as Address;

type ButtonProps = React.ComponentProps<typeof Button>;

interface DepositDialogProps {
  poolItem: PoolType;
  tokenAddress: Address | undefined;
  triggerButton?: React.ReactElement<ButtonProps>;
}

export const DepositDialog: React.FC<DepositDialogProps> = ({
  poolItem,
  tokenAddress,
  triggerButton,
}) => {
  // const config = useConfig();
  const {
    isOpen,
    handleOpenChange,
    step,
    setStep,
    selectedYieldData,
    setSelectedYieldData,
    error: dialogError,
    setError: setDialogError,
  } = useDepositDialog();

  const {
    checkAndRequestApproval,
    isLoading: isApprovalLoading,
    isChecking: isCheckingAllowance,
    isApproving,
    error: approvalError,
    resetError: resetApprovalError,
  } = useTokenApproval({
    tokenAddress: tokenAddress,
    spenderAddress: SPENDER_ADDRESS,
  });

  const isLoading = step === "loading" || isApprovalLoading;
  const error = dialogError || approvalError;

  useEffect(() => {
    if (!isOpen) {
      resetApprovalError();
      setDialogError(null);
    }
  }, [isOpen, resetApprovalError, setDialogError]);

  const handleTriggerClick = useCallback(async () => {
    setDialogError(null);
    resetApprovalError();

    handleOpenChange(true);
    setStep("loading");

    await checkAndRequestApproval({
      onSuccess: () => {
        setStep("selecting");
      },
      onError: (err) => {
        setDialogError(`Approval failed: ${err.message}`);
        handleOpenChange(false);
      },
      onRequiresApproval: () => {
        setStep("loading");
      },
    });
  }, [
    setDialogError,
    resetApprovalError,
    handleOpenChange,
    setStep,
    checkAndRequestApproval,
  ]);

  const handleYieldSelect = useCallback(
    (yieldData: YieldData) => {
      setSelectedYieldData(yieldData);
      setStep("form");
    },
    [setSelectedYieldData, setStep],
  );

  const triggerButtonText = useMemo(() => {
    if (isCheckingAllowance) return "Checking...";
    if (isApproving) return "Approving...";
    return "Deposit";
  }, [isCheckingAllowance, isApproving]);

  const TriggerComponent = useMemo(() => {
    const propsToAdd = {
      disabled:
        isLoading || (triggerButton ? triggerButton.props.disabled : false),
    };

    if (triggerButton) {
      return React.cloneElement(triggerButton, propsToAdd);
    } else {
      return (
        <Button
          className="cursor-pointer px-4 py-1.5 bg-gradient-to-r hover:from-teal-200 from-teal-400 to-teal-600 text-white rounded-full text-xs font-medium hover:opacity-50 transition-opacity shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          variant="default"
          disabled={propsToAdd.disabled}
        >
          {triggerButtonText}
        </Button>
      );
    }
  }, [triggerButton, isLoading, triggerButtonText]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="h-[200px] flex flex-col gap-4 items-center justify-center text-center">
          <DialogHeader>
            <DialogTitle className="text-red-400">Error</DialogTitle>
            <DialogDescription className="text-red-300 pt-2">
              {error}
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => handleOpenChange(false)}
            variant="destructive"
            size="sm"
          >
            Close
          </Button>
        </div>
      );
    }

    if (isLoading) {
      let loadingText = "Initializing...";
      if (isCheckingAllowance) loadingText = "Checking token allowance...";
      if (isApproving) loadingText = "Waiting for approval confirmation...";
      return (
        <div className="h-[200px] flex gap-8 flex-col items-center justify-center">
          <DialogHeader className="text-center">
            <DialogTitle className="text-white text-center">
              Processing
            </DialogTitle>
            <DialogDescription className="text-white text-center pt-2">
              {loadingText}
            </DialogDescription>
          </DialogHeader>
          <LoaderOne />
        </div>
      );
    }

    if (step === "selecting") {
      return (
        <YieldSelectionView item={poolItem} onSelectYield={handleYieldSelect} />
      );
    }

    if (step === "form" && selectedYieldData) {
      return (
        <>
          <DialogHeader>
            <DialogTitle className="text-white">
              Enter Deposit Amount
            </DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <DepositForm
              poolName={poolItem.coinName}
              tokenAddress={tokenAddress}
              decimals={poolItem.tokenDecimals}
              icon={poolItem.icon}
            />
          </div>
        </>
      );
    }
    return null;
  };

  const handleActualOpenChange = useCallback(
    (open: boolean) => {
      handleOpenChange(open);
      if (open) {
        handleTriggerClick();
      }
    },
    [handleOpenChange, handleTriggerClick],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleActualOpenChange}>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className="w-full max-w-[300px] md:min-w-[500px] p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-lg shadow-lg border border-gray-700">
        <div className="min-h-[200px] flex flex-col justify-center">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
