import { useAccount } from "wagmi";
import { Outlet } from "react-router";
import { ConnectWalletPage } from "./ConnectWalletPage";

export const ProtectedRoute = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectWalletPage />;
  }

  return <Outlet />;
};
