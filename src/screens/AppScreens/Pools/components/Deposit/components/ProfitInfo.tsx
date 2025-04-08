import { FC } from "react";
import { YieldsData } from "@/stores/deposit-form-store.ts";
import { useFormContext, useWatch } from "react-hook-form";
import { DepositFormType } from "@/screens/AppScreens/Pools/components/DepositForm.tsx";
import { format } from "date-fns";

type ProfitInfoProps = {
  item: YieldsData | null;
};

export const ProfitInfo: FC<ProfitInfoProps> = ({ item }) => {
  const { coinName, liq, type } = item || {};
  const { control } = useFormContext<DepositFormType>();

  const watchedDuration = useWatch({
    control,
    name: "duration",
  });

  const weeks = Number(watchedDuration?.toString().split(" ")[0]);

  const apr =
    type === "LY" && Array.isArray(liq) ? `${liq[0]}% - ${liq[1]}%` : `${liq}%`;

  const poolApr =
    type === "LY" && Array.isArray(liq)
      ? `${(Number(liq[0]) / 365).toFixed(2)}% - ${(Number(liq[1]) / 365).toFixed(2)}%`
      : `${(Number(liq) / 365).toFixed(2)}%`;

  const fyApr = weeks > 1 ? `${Number(liq) + 23 * weeks}` : `${liq}`;

  const fyPoolApr = (Number(fyApr) / 365).toFixed(2);

  const unlockDate = weeks
    ? format(
        new Date(
          new Date().setHours(15, 0, 0, 0) + weeks * 7 * 24 * 60 * 60 * 1000,
        ),
        "dd MMM yyyy, HH:mm",
      )
    : "-";

  return (
    <div className="w-full text-white flex flex-col space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm sm:text-base">
            Total APR
        </p>
        <p className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-sm sm:text-base"> 
          {`Up to ${type === "LY" ? apr : `${fyApr}%`}`}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-medium text-sm sm:text-base"> 
            {`${coinName} DPR`}
        </p>
        <p className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-sm sm:text-base"> 
          {`Up to ${type === "LY" ? poolApr : `${fyPoolApr}%`}`}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-medium text-sm sm:text-base"> 
            Duration
        </p>
        <p className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-sm sm:text-base"> 
          {`${watchedDuration}`}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-medium text-sm sm:text-base"> 
            Unlock on
        </p>
        <p className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-green-300 to-green-600 text-sm sm:text-base"> 
          {unlockDate}
        </p>
      </div>
</div>
  );
};
