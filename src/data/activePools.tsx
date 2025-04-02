import React from "react";
import { Address } from "viem";

import TetherIcon from "@/assets/coinIcons/tether-usdt-logo.svg?react";
import UsdcIcon from "@/assets/coinIcons/usdc-logo.svg?react";
import DaiIcon from "@/assets/coinIcons/dai-logo.svg?react";

export interface PoolType {
  chainId: string;
  icon: React.ReactNode;
  coinName: string;
  date: string;
  liquidity: string;
  ly_liq: string;
  ly_amount: string;
  fy_liq: string;
  fy_amount: string;
  isActive: boolean;
  tokenAddress: Address | undefined;
  tokenSymbol: string;
  tokenDecimals: number;
}

const ARBITRUM_CHAIN_ID = "42161";

const TOKEN_ADDRESSES: Record<string, Record<string, Address>> = {
  [ARBITRUM_CHAIN_ID]: {
    USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    DAI: "0xDA10009cbd5D07dd0CeCc66161FC93D7c9000da1",
  },
};

const TOKEN_DETAILS: Record<string, { decimals: number; symbol: string }> = {
  USDT: { decimals: 6, symbol: "USDT" },
  USDC: { decimals: 6, symbol: "USDC" },
  DAI: { decimals: 18, symbol: "DAI" },
};

export const activePools: PoolType[] = [
  {
    chainId: ARBITRUM_CHAIN_ID,
    icon: <TetherIcon />,
    coinName: "USDT",
    date: "28 Sep 2025",
    liquidity: "$ 420.66M",
    ly_liq: "210%",
    ly_amount: "$0.9704",
    fy_liq: "148%",
    fy_amount: "$0.8323",
    isActive: true,
    tokenAddress: TOKEN_ADDRESSES[ARBITRUM_CHAIN_ID]?.["USDT"],
    tokenSymbol: TOKEN_DETAILS["USDT"].symbol,
    tokenDecimals: TOKEN_DETAILS["USDT"].decimals,
  },
  {
    chainId: ARBITRUM_CHAIN_ID,
    icon: <UsdcIcon />,
    coinName: "USDC",
    date: "28 Sep 2025",
    liquidity: "$ 380.12M",
    ly_liq: "240%",
    ly_amount: "$0.4504",
    fy_liq: "194%",
    fy_amount: "0.8421", // Убран '$'
    isActive: true,
    tokenAddress: TOKEN_ADDRESSES[ARBITRUM_CHAIN_ID]?.["USDC"],
    tokenSymbol: TOKEN_DETAILS["USDC"].symbol,
    tokenDecimals: TOKEN_DETAILS["USDC"].decimals,
  },
  {
    chainId: ARBITRUM_CHAIN_ID,
    icon: <DaiIcon />,
    coinName: "DAI",
    date: "28 Sep 2025",
    liquidity: "$ 510.43M",
    ly_liq: "202%",
    ly_amount: "$0.5561",
    fy_liq: "232%",
    fy_amount: "$0.4728",
    isActive: true,
    tokenAddress: TOKEN_ADDRESSES[ARBITRUM_CHAIN_ID]?.["DAI"],
    tokenSymbol: TOKEN_DETAILS["DAI"].symbol,
    tokenDecimals: TOKEN_DETAILS["DAI"].decimals,
  },

  {
    chainId: ARBITRUM_CHAIN_ID,
    icon: <TetherIcon />,
    coinName: "USDT",
    date: "28 Sep 2024",
    liquidity: "$ 887.56M",
    ly_liq: "180%",
    ly_amount: "$1.2482",
    fy_liq: "199%",
    fy_amount: "$1.001",
    isActive: false,
    tokenAddress: TOKEN_ADDRESSES[ARBITRUM_CHAIN_ID]?.["USDT"],
    tokenSymbol: TOKEN_DETAILS["USDT"].symbol,
    tokenDecimals: TOKEN_DETAILS["USDT"].decimals,
  },
  {
    chainId: ARBITRUM_CHAIN_ID,
    icon: <UsdcIcon />,
    coinName: "USDC",
    date: "28 Sep 2024",
    liquidity: "$ 680.23M",
    ly_liq: "240%",
    ly_amount: "1200",
    fy_liq: "",
    fy_amount: "",
    isActive: false,
    tokenAddress: TOKEN_ADDRESSES[ARBITRUM_CHAIN_ID]?.["USDC"],
    tokenSymbol: TOKEN_DETAILS["USDC"].symbol,
    tokenDecimals: TOKEN_DETAILS["USDC"].decimals,
  },
  {
    chainId: ARBITRUM_CHAIN_ID,
    icon: <DaiIcon />,
    coinName: "DAI",
    date: "28 Sep 2024",
    liquidity: "$ 910.32M",
    ly_liq: "240%",
    ly_amount: "1200",
    fy_liq: "",
    fy_amount: "",
    isActive: false,
    tokenAddress: TOKEN_ADDRESSES[ARBITRUM_CHAIN_ID]?.["DAI"],
    tokenSymbol: TOKEN_DETAILS["DAI"].symbol,
    tokenDecimals: TOKEN_DETAILS["DAI"].decimals,
  },
];
