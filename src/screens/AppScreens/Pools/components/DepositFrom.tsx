import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";

const duration = ["1 W", "1 M", "6 M", "1 Y", "4 W"];

const DepositFormSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  duration: z.enum(["1w", "1m", "6m", "1y", "4y"]),
});

type DepositFormType = z.infer<typeof DepositFormSchema>;

export const DepositForm = () => {
  const methods = useForm<DepositFormType>({
    resolver: zodResolver(DepositFormSchema),
    defaultValues: {
      amount: 0,
      duration: "1w",
    },
  });

  const { register, handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<DepositFormType> = async (data) => {
    console.log(data, "data");
  };

  return (
    <FormProvider {...methods}>
      <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <Form.Field name="amount" className="flex flex-col">
          <Form.Label className="text-md font-medium text-white mb-2">
            Amount
          </Form.Label>
          <Form.Control asChild>
            <input
              type="number"
              {...register("amount")}
              className="border rounded p-2 mt-1 text-white"
              placeholder="Enter amount"
            />
          </Form.Control>
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
