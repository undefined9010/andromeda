import { PoolCard } from "@/components/PoolCard.tsx";
import { motion } from "framer-motion";

export const PoolCardContainer = () => {
  return (
    <div className="grid grid-cols-3 pt-[200px] gap-6 px-6">
      {[1, 2, 3].map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: -20 }}
          transition={{
            delay: index * 0.3,
            duration: 0.3,
            ease: "circIn",
          }}
        >
          <PoolCard />
        </motion.div>
      ))}
    </div>
  );
};
