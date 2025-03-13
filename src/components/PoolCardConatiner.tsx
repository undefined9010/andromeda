import { PoolCard } from "@/components/PoolCard.tsx";
import { motion } from "framer-motion";

export const PoolCardContainer = () => {
  return (
    <div className="h-full overflow-hidden">
      {/* Мобильная версия с вертикальным скроллом */}
      <div className="block h-full sm:hidden overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 pb-6">
          {Array.from({ length: 3 }).map((_, index) => (
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

      <div className="hidden sm:grid h-full overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.from({ length: 3 }).map((_, index) => (
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
  );
};
