import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import UsdtIcon from "@/assets/coinIcons/tether-usdt-logo.svg?react";

import { ReactElement } from "react";

export type InputFormProps<
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
> = {
  name: TNameType;
  control: Control<TFieldValuesType>;
  type?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  balance?: string | undefined;
  symbol?: string;
};

export const Input = <
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
>(
  props: InputFormProps<TFieldValuesType, TNameType>,
): ReactElement => {
  const {
    control,
    name,
    disabled,
    required,
    placeholder,
    label,
    // error,
    balance,
    symbol,
  } = props;

  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <Form.Field name={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control asChild>
        <div className="border w-full border-gray-600 h-12 rounded-lg flex items-center justify-between">
          <span className="pl-2 pr-5 flex-shrink-0">
            <UsdtIcon width={24} height={24} />
          </span>
          <input
            {...field}
            value={field.value || ""}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete="off"
            className="focus:outline-none w-full focus:ring-0 focus:border-transparent text-green-100"
          />
          {balance && (
            <span className="w-full text-gray-500 text-xs line-clamp-1 text-right pr-2">
              balance: {balance ?? 0} {symbol}
            </span>
          )}
        </div>
      </Form.Control>
    </Form.Field>
  );
};
