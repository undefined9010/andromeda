import { useAppKit } from "@reown/appkit/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

export const useConnectWallet = () => {
  const [openNav, setOpenNav] = useState(false);
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();

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

  return {
    handleOpenNav,
    handleOpenModal,
    handleDisconnect,
    isConnected,
    address,
  };
};
