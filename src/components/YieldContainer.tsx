import { YieldCard } from "@/components/YieldCard.tsx";
import useMediaQuery from "@/hooks/useMediaQuery.ts";
import { Link } from "react-router";
import { RoutePaths } from "@/router/routes.ts";
import { ShimmerButton } from "@/components/ui/shimmer-button.tsx";

export const YieldContainer = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const cards = isMobile ? [1] : [1, 2, 3];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl  sm:text-3xl md:text-4xl font-extralight  text-white mb-6 sm:mb-8">
        Liberating Yield
      </h1>

      <div className="flex gap-6 sm:gap-8 items-center justify-center sm:justify-between">
        {cards.map((card) => (
          <YieldCard key={card} />
        ))}
      </div>
      <div className="hidden sm:flex">
        <Link to={RoutePaths.POOLS}>
          <ShimmerButton className="text-white w-[300px] mt-8 text-md ">
            <span className="text-white">Earn now</span>
          </ShimmerButton>
        </Link>
      </div>
    </div>
  );
};
