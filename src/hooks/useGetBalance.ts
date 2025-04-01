import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi } from "viem";

export const useGetBalance = () => {
  const USDT_CONTRACT_ADDRESS_ARBITRUM =
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

  const { address, isConnected } = useAccount();

  const { data: usdtContractData, isLoading: isLoadingUsdt } = useReadContracts(
    {
      allowFailure: true,
      contracts: [
        {
          address: USDT_CONTRACT_ADDRESS_ARBITRUM,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address!],
        },
        {
          address: USDT_CONTRACT_ADDRESS_ARBITRUM,
          abi: erc20Abi,
          functionName: "decimals",
        },
        {
          address: USDT_CONTRACT_ADDRESS_ARBITRUM,
          abi: erc20Abi,
          functionName: "symbol",
        },
      ],
      query: {
        enabled: isConnected && !!address && !!USDT_CONTRACT_ADDRESS_ARBITRUM,
      },
    },
  );

  let usdtBalanceRaw = null;
  let usdtDecimals = null;

  let formattedUsdtBalance = "0";

  if (!isLoadingUsdt && usdtContractData) {
    if (usdtContractData[0]?.status === "success") {
      usdtBalanceRaw = usdtContractData[0].result;
    }
    if (usdtContractData[1]?.status === "success") {
      usdtDecimals = usdtContractData[1].result;
    }

    if (usdtBalanceRaw !== null && usdtDecimals !== null) {
      formattedUsdtBalance = (
        Number(usdtBalanceRaw) /
        10 ** usdtDecimals
      ).toFixed(2);
    }
  }

  return { formattedUsdtBalance };
};
