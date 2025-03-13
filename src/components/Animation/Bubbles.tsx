export const Bubbles = () => {
  return (
    <>
      <div className="absolute -z-10 top-[20px] w-[300px] h-[300px] sm:-top-[100px] sm:left-0 sm:w-[600px] sm:h-[800px] bg-gradient-to-r from-[#90e0ef] to-[#07c1b6] blur-3xl opacity-10 rounded-full animate-blink " />
      <div className="absolute -z-10 bottom-[100px] right-[120px] w-[100px] h-[200px] sm:top-[400px] sm:-right-[320px] sm:w-[1200px] sm:h-[900px] bg-gradient-to-r rotate-[40deg] from-[#07c1b6] to-[#00b4d8] blur-2xl opacity-10 rounded-full animate-blink" />
    </>
  );
};
