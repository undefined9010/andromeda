import { PoolCard } from "@/components/PoolCard.tsx";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";
import { useConnectWallet } from "@/hooks/useConnectWallet.ts";

export const PoolCardContainer = () => {
  const { isConnected } = useAccount();
  const { handleOpenModal } = useConnectWallet();

  return (
    <div className="relative h-full">
      {!isConnected && (
        <div className="absolute z-50 top-1/4 sm:top-40 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center bg-black/50 text-white text-lg sm:text-xl font-semibold px-4 py-3 rounded-md mt-4 w-[90%] max-w-md">
          <p className="text-center font-[400]">Please connect your wallet</p>

          <div className="flex mt-3">
            <ShimmerButton
              onClick={handleOpenModal}
              className="text-white text-base h-10 w-full"
            >
              <span className="text-white font-[400] text-[14px]">
                Connect wallet
              </span>
            </ShimmerButton>
          </div>
        </div>
      )}
      <div
        className={`h-full ${!isConnected ? "blur-sm pointer-events-none" : ""}`}
      >
        <div className="block h-full sm:hidden overflow-y-auto pb-[100px]">
          <div className="flex flex-col gap-4 p-4 pb-6 min-h-screen">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "circIn",
                }}
              >
                <PoolCard />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden sm:grid h-full overflow-y-hidden sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.3,
                ease: "circIn",
              }}
              className="w-full"
            >
              <PoolCard />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
