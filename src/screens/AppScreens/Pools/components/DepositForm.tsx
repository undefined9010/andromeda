import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { createInputList } from "@/components/form";
import { http, useAccount, useBalance, useReadContracts } from "wagmi";
import Web3 from "web3";
import { getBalance } from "viem/actions";
import { createPublicClient, erc20Abi } from "viem";
import { arbitrum } from "viem/chains";

const duration = ["1 W", "1 M", "6 M", "1 Y", "4 W"];

const CHAINLINK_ETH_USDT = "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7";
const ABI = [
  "function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80)",
];

const DepositFormSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  duration: z.enum(["1w", "1m", "6m", "1y", "4y"]),
});

type DepositFormType = z.infer<typeof DepositFormSchema>;

const { ControlledInput } = createInputList<DepositFormType>();

export const DepositForm = () => {
  const web3 = new Web3(
    `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  );

  const USDT_ADDRESS = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";

  const USDT_CONTRACT_ADDRESS_ARBITRUM =
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

  const { address, isConnected } = useAccount();

  const { data: balanceData } = useBalance({
    address,
  });

  // Запрашиваем данные по USDT контракту
  const { data: usdtContractData, isLoading: isLoadingUsdt } = useReadContracts(
    {
      allowFailure: true, // Лучше true для отладки
      contracts: [
        {
          address: USDT_CONTRACT_ADDRESS_ARBITRUM, // Адрес контракта USDT
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address!], // Чей баланс проверяем (адрес пользователя)
        },
        {
          address: USDT_CONTRACT_ADDRESS_ARBITRUM, // Адрес контракта USDT
          abi: erc20Abi,
          functionName: "decimals", // Получаем кол-во знаков после запятой
        },
        {
          address: USDT_CONTRACT_ADDRESS_ARBITRUM, // Адрес контракта USDT
          abi: erc20Abi,
          functionName: "symbol", // Получаем символ токена (должен быть "USDT")
        },
      ],
      query: {
        enabled: isConnected && !!address && !!USDT_CONTRACT_ADDRESS_ARBITRUM, // Запускаем только если все есть
      },
    },
  );

  let usdtBalanceRaw = null;
  let usdtDecimals = null;
  let usdtSymbol = null;
  let formattedUsdtBalance = "0";

  if (!isLoadingUsdt && usdtContractData) {
    if (usdtContractData[0]?.status === "success") {
      usdtBalanceRaw = usdtContractData[0].result; // BigInt
    }
    if (usdtContractData[1]?.status === "success") {
      usdtDecimals = usdtContractData[1].result; // number (usually 6 for USDT)
    }
    if (usdtContractData[2]?.status === "success") {
      usdtSymbol = usdtContractData[2].result; // string
    }

    // Форматирование баланса USDT
    if (usdtBalanceRaw !== null && usdtDecimals !== null) {
      // Нужна функция для форматирования BigInt с учетом decimals
      // Например, из 'viem': import { formatUnits } from 'viem';
      // formattedUsdtBalance = formatUnits(usdtBalanceRaw, usdtDecimals);
      // Или вручную (менее точно для больших чисел):
      formattedUsdtBalance = (
        Number(usdtBalanceRaw) /
        10 ** usdtDecimals
      ).toFixed(2); // Примерно

      console.log(formattedUsdtBalance);
    }
  }

  // const { data: results } = useReadContracts({
  //   contracts: [
  //     {
  //       address: USDT_ADDRESS,
  //       abi: erc20Abi,
  //       functionName: "balanceOf",
  //       args: [address as `0x${string}`],
  //     },
  //     {
  //       address: USDT_ADDRESS,
  //       abi: erc20Abi,
  //       functionName: "decimals",
  //     },
  //     {
  //       address: USDT_ADDRESS,
  //       abi: erc20Abi,
  //       functionName: "symbol",
  //     },
  //   ],
  // });

  const methods = useForm<DepositFormType>({
    resolver: zodResolver(DepositFormSchema),
    defaultValues: {
      amount: 0,
      duration: "1w",
    },
  });

  // const formattedBalance = web3.utils.toWei(Number(balance?.formatted), "mwei");

  const { register, handleSubmit, formState, control } = methods;

  const onSubmit: SubmitHandler<DepositFormType> = async (data) => {
    console.log(data, "data");
  };

  return (
    <FormProvider {...methods}>
      <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 ">
        <Form.Field name="amount" className="flex flex-col">
          <Form.Label className="text-md font-medium text-white mb-2">
            Amount
          </Form.Label>

          <ControlledInput
            control={control}
            name="amount"
            symbol="USDT"
            balance={formattedUsdtBalance ?? ""}
            placeholder="Enter amount of tokens"
          />

          {formState.errors.amount && (
            <Form.Message className="text-red-500 text-xs">
              {formState.errors.amount.message}
            </Form.Message>
          )}
        </Form.Field>

        <Form.Field name="duration">
          <Form.Label className="text-md font-medium text-white mb-2">
            Duration
          </Form.Label>
          <RadioGroup.Root
            {...register("duration")}
            className="flex gap-2 mt-1"
          >
            {duration.map((value) => (
              <RadioGroup.Item
                key={value}
                value={value}
                className="px-3 py-1 text-sm border text-white rounded-md cursor-pointer data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
              >
                {value}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
          {formState.errors.duration && (
            <Form.Message className="text-red-500 text-xs">
              {formState.errors.duration.message}
            </Form.Message>
          )}
        </Form.Field>

        <Form.Submit asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-3">
            Submit
          </button>
        </Form.Submit>
      </Form.Root>
    </FormProvider>
  );
};
