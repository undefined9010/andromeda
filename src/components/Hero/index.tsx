import { motion } from "framer-motion";
import { LampContainer } from "@/components/Animation/Lamp.tsx";
import { SparklesCore } from "@/components/Animation/Sparkles.tsx";

export const Hero = () => {
  const title = "Andromeda";
  const words = title?.split(" ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="min-w-full bg-black absolute h-0 sm:top-20"
    >
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-white to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-glow">
            {words?.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 120,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text
                                      bg-gradient-to-r
                                      from-white/10 to-white/10"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>
      </LampContainer>

      <div
        className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10
                      dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg
                      overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      ></div>
      <div className="absolute w-[100%] -top-[250px] sm:top-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.2}
          particleDensity={45}
          particleColor="#ffffed"
          speed={0}
        />
      </div>
    </motion.div>
  );
};
