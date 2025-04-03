import { FC, ReactNode, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Form from "@radix-ui/react-form";
import { createInputList } from "@/components/form";
import { useTokenBalance } from "@/hooks/useTokenBalance.ts";
import { Web3 } from "web3";
import { useTransferTokens } from "@/hooks/useTransferTokens.ts";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button.tsx";

const duration = ["1 W", "1 M", "6 M", "1 Y", "4 W"];

const DepositFormSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be at least 1"),
  duration: z.string().min(1, "Duration must be at least 1"),
});

export type DepositFormType = z.infer<typeof DepositFormSchema>;

const { ControlledInput } = createInputList<DepositFormType>();

type DepositFormProps = {
  poolName: string;
  tokenAddress: `0x${string}`;
  icon: ReactNode;
};

export const DepositForm: FC<DepositFormProps> = ({
  icon,
  tokenAddress,
  poolName,
}) => {
  const web3 = new Web3(
    `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  );
  const { transferTokens, isApproving } = useTransferTokens();
  // const { yieldsData } = useYieldsStore();

  const {
    formattedBalance,
    // symbol: fetchedSymbol,
    // decimals,
    isLoading: isLoadingBalance,
    // error: balanceError,
  } = useTokenBalance(tokenAddress);

  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(
    null,
  );
  const [selectedDuration, setSelectedDuration] = useState<string>("1w");

  const methods = useForm<DepositFormType>({
    resolver: zodResolver(DepositFormSchema),
    defaultValues: {
      amount: 0,
      duration: "1w",
    },
  });

  const { setValue, handleSubmit, reset } = methods;

  const handleSetAmount = (percentage: number) => {
    if (formattedBalance) {
      const calculatedAmount = (Number(formattedBalance) * percentage) / 100;
      setValue("amount", Number(calculatedAmount.toFixed(2)));
      setSelectedPercentage(percentage);
    }
  };

  const handleSetDuration = (duration: string) => {
    setSelectedDuration(duration);
    setValue("duration", duration);
  };

  const onSubmit: SubmitHandler<DepositFormType> = async (data) => {
    const tokenAmount = web3.utils.toWei(data.amount, "mwei");

    await transferTokens(tokenAmount, tokenAddress, poolName, reset);
  };

  return (
    <FormProvider {...methods}>
      <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <Form.Field name="amount" className="flex flex-col">
          <Form.Label className="text-md font-medium text-white mb-2">
            Amount
          </Form.Label>

          <ControlledInput
            control={methods.control}
            icon={icon}
            name="amount"
            type="number"
            symbol={poolName}
            maxValue={Number(formattedBalance)}
            balance={formattedBalance ?? ""}
            placeholder="Enter amount of tokens"
            isLoadingBalance={isLoadingBalance}
          />

          {methods.formState.errors.amount && (
            <Form.Message className="text-red-500 text-xs">
              {methods.formState.errors.amount.message}
            </Form.Message>
          )}
        </Form.Field>

        <div className="flex gap-2 mt-2">
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              type="button"
              onClick={() => handleSetAmount(percent)}
              className={`px-3 py-1 w-full rounded-md border text-white cursor-pointer transition-colors 
                ${
                  selectedPercentage === percent
                    ? "bg-teal-500 border-teal-900"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
            >
              {percent}%
            </button>
          ))}
        </div>

        <Form.Field name="duration" className="flex flex-col">
          <Form.Label className="text-md font-medium text-white mb-2">
            Duration
          </Form.Label>

          <ControlledInput
            control={methods.control}
            name="duration"
            type="text"
            noIcon
            placeholder="Select duration"
          />
        </Form.Field>

        <div className="flex gap-2 mt-2">
          {duration.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => handleSetDuration(d)}
              className={`px-3 py-1 w-full rounded-md border text-white cursor-pointer transition-colors 
                ${
                  selectedDuration === d
                    ? "bg-teal-500 border-teal-900"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
            >
              {d}
            </button>
          ))}
        </div>

        <Form.Submit asChild>
          <InteractiveHoverButton
            isLoading={isApproving}
            className="bg-teal-500 w-full text-white px-4 py-2 rounded-md mt-3"
            text="Transfer"
          />
          {/*<button className="bg-teal-500 w-full text-white px-4 py-2 rounded mt-3">*/}
          {/*  Submit*/}
          {/*</button>*/}
        </Form.Submit>
      </Form.Root>
    </FormProvider>
  );
};
