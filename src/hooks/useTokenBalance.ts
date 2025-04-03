import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi, type Address, formatUnits } from "viem";
import { useMemo } from "react";

interface UseTokenBalanceReturn {
  balance?: bigint;
  decimals?: number;
  symbol?: string;
  formattedBalance: string;
  isLoading: boolean;
  error: Error | null;
}

export const useTokenBalance = (
  tokenAddress: Address | undefined,
): UseTokenBalanceReturn => {
  const { address: accountAddress, isConnected } = useAccount();

  const contractCalls = useMemo(
    () =>
      tokenAddress && accountAddress
        ? [
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [accountAddress],
            } as const,
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "decimals",
            } as const,
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "symbol",
            } as const,
          ]
        : [],
    [tokenAddress, accountAddress],
  );

  const {
    data: contractData,
    isLoading,
    error: readContractsError,
  } = useReadContracts({
    allowFailure: true,
    contracts: contractCalls,
    query: {
      enabled:
        isConnected &&
        !!accountAddress &&
        !!tokenAddress &&
        contractCalls.length > 0,
    },
  });

  const result = useMemo(() => {
    const defaultReturn: Omit<UseTokenBalanceReturn, "isLoading" | "error"> = {
      formattedBalance: "0.00",
    };

    if (isLoading || !contractData || contractData.length !== 3) {
      return defaultReturn;
    }

    const [balanceResult, decimalsResult, symbolResult] = contractData;

    let balance: bigint | undefined = undefined;
    let decimals: number | undefined = undefined;
    let symbol: string | undefined = undefined;
    let formattedBalance = "0.00";

    if (balanceResult?.status === "success") {
      balance = balanceResult.result as bigint;
    }
    if (decimalsResult?.status === "success") {
      decimals = decimalsResult.result as number;
    }
    if (symbolResult?.status === "success") {
      symbol = symbolResult.result as string;
    }

    if (balance !== undefined && decimals !== undefined) {
      try {
        formattedBalance = parseFloat(formatUnits(balance, decimals)).toFixed(
          2,
        );
      } catch (e) {
        console.error("Error formatting balance:", e);
        formattedBalance = "0.00";
      }
    }

    return { balance, decimals, symbol, formattedBalance };
  }, [contractData, isLoading]);

  return {
    ...result,
    isLoading,
    error: readContractsError,
  };
};
