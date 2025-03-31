import { FC } from "react";

interface AssetCardProps {
  label: string;
  labelColor: string;
  description: string;
  valueColor: string;
  value: string;
  price: string;
}

const AssetCard: FC<AssetCardProps> = ({
  label,
  labelColor,
  description,
  valueColor,
  value,
  price,
}) => {
  return (
    <div
      className={`mt-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-600/50 active:bg-gray-400/50 border border-gray-700 cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        <span className={`font-semibold text-sm ${labelColor}`}>{label}</span>
        <span className="text-gray-400 text-xs">{description}</span>
        <span className={`font-semibold text-sm ${valueColor}`}>{value}</span>
      </div>
      <div className="flex justify-between items-baseline mt-1">
        <p className="text-gray-400 text-xs">Price</p>
        <p className="text-white  text-base">{price}</p>
      </div>
    </div>
  );
};

export default AssetCard;
