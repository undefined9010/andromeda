"use client";
import React from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery.ts";

export const LampContainer = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isMobile = useMediaQuery("(max-width: 430px)");

  return (
    <div
      className={
        "absolute -bottom-[280px] flex min-h-[900px] flex-col items-center justify-center overflow-hidden bg-transparent w-full rounded-md z-0  sm:top-[-290px]"
      }
    >
      <div className="relative flex w-full flex-1 scale-y-[80%] items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.1, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[#07c1b6] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.1, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#07c1b6] text-white [--conic-position:from_290deg_at_center_top]"
        ></motion.div>

        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#07c1b6] opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#07c1b6] blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: isMobile ? "70%" : "100%" }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="hidden sm:visible absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-[#07c1b6] "
        ></motion.div>

        <div className="hidden sm:visible absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-neutral-950"></div>
      </div>

      <div className="relative z-50 flex -translate-y-120 sm:-translate-y-100 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
