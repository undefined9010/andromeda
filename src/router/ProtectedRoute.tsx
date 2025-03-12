import {  Outlet } from "react-router";
import { FC, ReactNode } from "react";
import { ConnectWalletPage } from "@/components/ConnectWalletPage";

interface IProtectedProps {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}

export const ProtectedRoute: FC<IProtectedProps> = ({
  isAllowed,
  children,
}) => {
  if (!isAllowed) {
    return <ConnectWalletPage />;
  }

  return children ? children : <Outlet />;
};
