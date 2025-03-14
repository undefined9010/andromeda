import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "viem/chains";
import { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";

const queryClient = new QueryClient();

const projectId = "2318f61203b9b3cee180057eaf2755e9";

const metadata = {
  name: "Test",
  description: "AppKit Example",
  url: "https://reown.com/appkit",
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet],
  projectId,
  ssr: true,
});

// Инициализируем AppKit один раз при импорте файла
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
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
