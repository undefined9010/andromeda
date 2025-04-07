import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/Preloader";

export const RegularLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader key="layout-preloader" />}
      </AnimatePresence>

      <motion.div
        className="flex flex-col min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: isLoading ? 0 : 0.1 }}
      >
        <Header />

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        <Footer />
      </motion.div>
    </>
  );
};
