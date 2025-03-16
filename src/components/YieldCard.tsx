import SolanaIcon from "@/assets/coinIcons/solana.svg?react";

export const YieldCard = () => {
  return (
    <div className="w-full rounded-lg px-6 py-4 bg-[#6e89e010] backdrop-blur-xs shadow-lg border border-white/20">
      <div className="flex gap-6 items-center ">
        <SolanaIcon
          className="filter text-glow drop-shadow-[0_0_10px_#fff] brightness-150"
          width="24px"
          height="24px"
        />
        <div className="flex flex-col justify-center items-start ">
          <span className="text-white sm:text-md md:text-md font-bold text-glow">
            eUSDe
          </span>
          <div className="flex items-center gap-2">
            <span className="sm:text-sm md:text-md text-[#07c1b6]">18.68%</span>
            <span className="text-white/80 sm:text-sm md:text-md text-shadow-lg">
              fixed yield
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
