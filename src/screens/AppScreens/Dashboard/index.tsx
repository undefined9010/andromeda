import { useState } from "react";
import { useAccount } from "wagmi";
import { Link } from "react-router";
import { RoutePaths } from "@/router/routes";

const networks = [
  { id: "eth", icon: "🌐", name: "Ethereum" },
  { id: "arb", icon: "🔷", name: "Arbitrum" },
  { id: "op", icon: "🔴", name: "Optimism" },
  { id: "base", icon: "🟢", name: "Base" },
  { id: "bnb", icon: "💛", name: "BNB Chain" },
];

const tabs = ["All Assets", "PT", "YT", "LP"];

export const Dashboard = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("All Assets");
  const [displayMode, setDisplayMode] = useState<"USD" | "Underlying">("USD");

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <div className="p-4 sm:p-6 text-white max-w-7xl mx-auto">
      {/* Header with address */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            👤
          </div>
          <span className="text-lg">{shortAddress}</span>
        </div>
        <input
          type="text"
          placeholder="Go to wallet address"
          className="px-4 py-2 rounded-lg bg-[#1a1f2e] border border-gray-700 w-full sm:w-[300px]"
        />
      </div>

      {/* Network selector */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
        {networks.map((network) => (
          <button
            key={network.id}
            className="w-10 h-10 rounded-full bg-[#1a1f2e] flex items-center justify-center hover:bg-[#2a2f3e] transition-colors"
            title={network.name}
          >
            {network.icon}
          </button>
        ))}
      </div>

      {/* Balance and rewards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 rounded-xl bg-[#1a1f2e] border border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <span className="text-blue-400">$</span>
            My Current Balance
          </div>
          <div className="text-2xl sm:text-3xl font-semibold">$0</div>
        </div>

        <div className="p-4 sm:p-6 rounded-xl bg-[#1a1f2e] border border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <span className="text-blue-400">⚡</span>
            My Claimable Yield & Rewards
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
            External Rewards
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

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-gray-400">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-6">
            <img src="/empty-box.png" alt="No positions" className="w-full h-full" />
          </div>
          <p className="mb-4 text-center">You do not have any positions yet.</p>
          <Link
            to={RoutePaths.POOLS}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:opacity-90 transition-opacity"
          >
            View Markets
          </Link>
        </div>
      </div>
    </div>
  );
};
