import { motion } from "framer-motion";

export const Preloader = () => {
  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0F1C]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-64 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </div>
      <p className="text-gray-400 text-sm mt-3">Loading app...</p>
    </motion.div>
  );
};
