import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useConfig,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { MaxUint256 } from "ethers";
import { type Address, erc20Abi } from "viem";

interface UseTokenApprovalProps {
  tokenAddress?: Address;
  spenderAddress?: Address;
  amountToApprove?: bigint;
}

interface UseTokenApprovalReturn {
  checkAndRequestApproval: (callbacks: {
    onSuccess: () => void;
    onError: (error: Error) => void;
    onRequiresApproval?: () => void;
  }) => Promise<void>;
  isLoading: boolean;
  isChecking: boolean;
  isApproving: boolean;
  isApproved: boolean | undefined;
  error: string | null;
  resetError: () => void;
}

export const useTokenApproval = ({
  tokenAddress,
  spenderAddress,
  amountToApprove = MaxUint256,
}: UseTokenApprovalProps): UseTokenApprovalReturn => {
  const config = useConfig();
  const { address: accountAddress, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [internalIsApproved, setInternalIsApproved] = useState<
    boolean | undefined
  >(undefined);

  const {
    data: currentAllowance,
    isLoading: isChecking,
    refetch: refetchAllowance,
    isError: isAllowanceError,
    error: allowanceError,
  } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: [accountAddress!, spenderAddress!],
    query: {
      enabled:
        !!accountAddress && !!tokenAddress && !!spenderAddress && isConnected,
      staleTime: 5_000,
      // refetchInterval: 15_000,
    },
  });

  const {
    writeContract,
    isPending: isApproving,
    error: approvalWriteError,
    reset: resetWriteContract,
  } = useWriteContract();

  useEffect(() => {
    if (currentAllowance !== undefined) {
      setInternalIsApproved(currentAllowance >= amountToApprove);
    } else {
      setInternalIsApproved(undefined);
    }
  }, [currentAllowance, amountToApprove]);

  const isLoading = isChecking || isApproving;

  const resetError = useCallback(() => {
    setError(null);
    resetWriteContract();
  }, [resetWriteContract]);

  useEffect(() => {
    if (isAllowanceError) {
      setError(`Allowance check failed: ${allowanceError?.message}`);
    } else if (approvalWriteError) {
      setError(`Approval transaction failed: ${approvalWriteError.message}`);
    }
  }, [isAllowanceError, allowanceError, approvalWriteError]);

  const checkAndRequestApproval = useCallback(
    async (callbacks: {
      onSuccess: () => void;
      onError: (error: Error) => void;
      onRequiresApproval?: () => void;
    }) => {
      resetError();
      if (!tokenAddress || !spenderAddress || !accountAddress || !isConnected) {
        const err = new Error(
          "Missing required data: connection, token, spender, or account address.",
        );
        setError(err.message);
        callbacks.onError(err);
        return;
      }

      try {
        const { data: allowance, isError: refetchError } =
          await refetchAllowance();
        if (refetchError) {
          throw new Error("Failed to refetch allowance.");
        }

        const hasSufficient =
          allowance !== undefined && allowance >= amountToApprove;

        setInternalIsApproved(hasSufficient);

        if (hasSufficient) {
          callbacks.onSuccess();
        } else {
          callbacks.onRequiresApproval?.();
          writeContract(
            {
              abi: erc20Abi,
              address: tokenAddress,
              functionName: "approve",
              args: [spenderAddress, amountToApprove],
            },
            {
              onSuccess: async (txHash) => {
                try {
                  const receipt = await waitForTransactionReceipt(config, {
                    hash: txHash,
                  });
                  if (receipt.status === "success") {
                    setInternalIsApproved(true);
                    await refetchAllowance();
                    callbacks.onSuccess();
                  } else {
                    throw new Error(
                      `Approval transaction reverted. Status: ${receipt.status}`,
                    );
                  }
                } catch (waitError) {
                  const err =
                    waitError instanceof Error
                      ? waitError
                      : new Error("Confirmation failed");
                  setError(err.message);
                  callbacks.onError(err);
                }
              },
              onError: (writeErr) => {
                setError(writeErr.message);
                callbacks.onError(writeErr);
              },
            },
          );
        }
      } catch (checkError) {
        const err =
          checkError instanceof Error
            ? checkError
            : new Error("Allowance check process failed");
        setError(err.message);
        callbacks.onError(err);
      }
    },
    [
      accountAddress,
      isConnected,
      tokenAddress,
      spenderAddress,
      amountToApprove,
      refetchAllowance,
      writeContract,
      config,
      resetError,
    ],
  );

  return {
    checkAndRequestApproval,
    isLoading,
    isChecking,
    isApproving,
    isApproved: internalIsApproved,
    error,
    resetError,
  };
};
