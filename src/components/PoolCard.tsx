export const PoolCard = () => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-xl shadow-lg border border-gray-700">
      <div className="absolute inset-0 rounded-2xl border-[20px] border-white/50 opacity-10 blur-lg -z-1"></div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          💲
        </div>
        <h2 className="text-white text-lg font-semibold">eUSDe</h2>
        <span className="text-gray-400 text-sm">ⓘ</span>
      </div>

      <p className="text-gray-400 text-sm">29 May 2025 (84 days)</p>

      <div className="mt-4">
        <p className="text-gray-400 text-sm">Liquidity</p>
        <p className="text-white text-lg font-semibold">$104.92M</p>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-blue-400 font-semibold">YT</span>
          <span className="text-gray-400 text-sm">Long Yield APY</span>
          <span className="text-red-400 font-semibold">-100%</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">Price</p>
        <p className="text-white text-lg">$0.02905</p>
      </div>

      <div className="mt-2 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-green-400 font-semibold">PT</span>
          <span className="text-gray-400 text-sm">Fixed APY</span>
          <span className="text-green-400 font-semibold">13.63%</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">Price</p>
        <p className="text-white text-lg">$0.9704</p>
      </div>
    </div>
  );
};
