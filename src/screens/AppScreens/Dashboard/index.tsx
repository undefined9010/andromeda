import { useState } from "react";
import { useAccount } from "wagmi";
import { WalletMenu } from "@/components/AppHeader";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";

const tabs = ["All Assets", "PT", "YT", "LP"];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All Assets");
  const [displayMode, setDisplayMode] = useState<"USD" | "Underlying">("USD");
  const { handleDisconnect } = useConnectWallet();

  const { chain, status, address } = useAccount();

  const shortAddress = address
    ? `${address.slice(0, 10)}...${address.slice(-4)}`
    : "";

  return (
    <div className="p-4 sm:p-6 text-white w-full mx-auto">
      {/* Header with address */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            👤
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-lg">{shortAddress}</span>
            <p className="text-sm sm:text-base">{chain?.name}</p>
          </div>
          <div className="sm:hidden">
            <WalletMenu
              handleDisconnect={handleDisconnect}
              status={status}
              chain={chain?.name ?? ""}
              address={address ?? ""}
            />
          </div>
        </div>
      </div>

      {/* Balance and rewards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 rounded-xl bg-[#1a1f2e] border border-gray-800">
          <div className="flex items-center  gap-2 mb-4 text-gray-400">
            <span className="text-blue-400">$</span>
            <p className="text-sm md:text-md">My Current Balance</p>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold">$0</div>
        </div>

        <div className="p-4 sm:p-6 rounded-xl bg-[#1a1f2e] border border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <span className="text-blue-400">⚡</span>
            <p className="text-sm md:text-md">My Claimable Yield & Rewards</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-2xl sm:text-3xl font-semibold">$0</div>
            <button className="px-4 py-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              Claim
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-xl bg-[#1a1f2e] border border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <span className="text-blue-400">🎁</span>
            <p className="text-sm md:text-md">External Rewards</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              Nothing to Claim
            </button>
          </div>
        </div>
      </div>

      {/* Positions section */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <h2 className="text-xl font-semibold">My Positions</h2>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1 rounded-full transition-colors ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-1 p-1 bg-[#1a1f2e] rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setDisplayMode("USD")}
              className={`flex-1 sm:flex-none px-4 py-1 rounded-lg transition-colors ${
                displayMode === "USD"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setDisplayMode("Underlying")}
              className={`flex-1 sm:flex-none px-4 py-1 rounded-lg transition-colors ${
                displayMode === "Underlying"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Underlying
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
