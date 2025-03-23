import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum, mainnet, sepolia } from "viem/chains";
import { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { defineChain } from "viem";

const queryClient = new QueryClient();

const projectId = "2318f61203b9b3cee180057eaf2755e9";

const metadata = {
  name: "Andromeda",
  description: "AppKit",
  url: "https://reown.com/appkit",
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

const ganache = defineChain({
  id: 1337,
  name: "Ganache",
  network: "ganache",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:7545"] } },
});

const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, ganache, sepolia, arbitrum],
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, ganache, sepolia, arbitrum],
  projectId,
  allWallets: "HIDE",
  customWallets: [{ id: "2", name: "More wallets coming soon" }],
  enableAuthLogger: false,
  metadata,
  features: { analytics: false, email: false, socials: false },
});

interface WagmiAppProviderProps {
  children: ReactNode;
}

export const WagmiAppProvider = ({ children }: WagmiAppProviderProps) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
