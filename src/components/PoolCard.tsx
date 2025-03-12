export const PoolCard = () => {
  return (
    <div className="relative w-full p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-xl shadow-lg border border-gray-700">
      <div className="absolute inset-0 rounded-2xl border-[20px] border-white/50 opacity-10 blur-lg -z-1"></div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
            💲
          </div>
          <h2 className="text-white text-base font-semibold">eUSDe</h2>
          <span className="text-gray-400 text-sm cursor-help">ⓘ</span>
        </div>
        <p className="text-gray-400 text-xs shrink-0">29 May 2025 (84 days)</p>
      </div>

      <div className="mt-3 flex justify-between items-baseline">
        <div>
          <p className="text-gray-400 text-xs">Liquidity</p>
          <p className="text-white text-base font-semibold">$104.92M</p>
        </div>
        <button className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full text-xs font-medium hover:opacity-90 transition-opacity shrink-0">
          View Details
        </button>
      </div>

      <div className="mt-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-blue-400 font-semibold text-sm">YT</span>
          <span className="text-gray-400 text-xs">Long Yield APY</span>
          <span className="text-red-400 font-semibold text-sm">-100%</span>
        </div>
        <div className="flex justify-between items-baseline mt-1">
          <p className="text-gray-400 text-xs">Price</p>
          <p className="text-white text-base">$0.02905</p>
        </div>
      </div>

      <div className="mt-2 p-3 rounded-xl bg-gray-800/50 border border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-green-400 font-semibold text-sm">PT</span>
          <span className="text-gray-400 text-xs">Fixed APY</span>
          <span className="text-green-400 font-semibold text-sm">13.63%</span>
        </div>
        <div className="flex justify-between items-baseline mt-1">
          <p className="text-gray-400 text-xs">Price</p>
          <p className="text-white text-base">$0.9704</p>
        </div>
      </div>
    </div>
  );
};
