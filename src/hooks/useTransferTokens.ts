import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { erc20Abi, parseUnits, type Address } from "viem";

// import { Log } from '@/lib/logs'; // Предполагается, что у вас есть утилита для логов

interface UseErc20TransferOptions {
  tokenAddress: Address | undefined;
  decimals: number | undefined;
}

interface UseErc20TransferReturn {
  /**
   * Асинхронная функция для инициирования перевода ERC20 токена.
   * Принимает адрес получателя и сумму в человекочитаемом формате (строка).
   * Возвращает Promise, который разрешается с хэшем транзакции в случае успеха
   * или отклоняется с ошибкой в случае неудачи.
   */
  transferToken: (
    recipientAddress: Address,
    humanAmount: string,
  ) => Promise<`0x${string}`>;
  isPending: boolean; // Идет ли процесс отправки транзакции (ожидание подтверждения в кошельке)
  error: Error | null; // Ошибка от useWriteContract
  reset: () => void; // Функция для сброса состояния isPending и error
}

/**
 * Хук для выполнения перевода (transfer) ERC20 токенов.
 * @param tokenAddress Адрес контракта ERC20 токена.
 * @param decimals Количество десятичных знаков токена.
 */
export const useTransferTokens = ({
  tokenAddress,
  decimals,
}: UseErc20TransferOptions): UseErc20TransferReturn => {
  // Получаем функцию writeContract и ее состояние из wagmi
  const {
    writeContract,
    isPending,
    error,
    reset,
    data: txHashData,
  } = useWriteContract();

  // Создаем мемоизированную функцию перевода
  const transferToken = useCallback(
    async (
      recipientAddress: Address,
      humanAmount: string,
    ): Promise<`0x${string}`> => {
      // 1. Проверка входных данных
      if (
        !tokenAddress ||
        decimals === undefined ||
        !recipientAddress ||
        humanAmount === undefined ||
        humanAmount === null
      ) {
        console.error("useErc20Transfer: Missing required arguments.", {
          tokenAddress,
          decimals,
          recipientAddress,
          humanAmount,
        });
        throw new Error("Missing required arguments for transfer.");
      }

      // 2. Конвертация суммы в базовые единицы (wei)
      let amountAsBigInt: bigint;
      try {
        const trimmedAmount = humanAmount.trim();
        if (trimmedAmount === "") {
          throw new Error("Amount cannot be empty.");
        }
        amountAsBigInt = parseUnits(trimmedAmount, decimals); // Используем parseUnits из viem/ethers
        // Дополнительная проверка, что сумма положительная
        if (amountAsBigInt <= 0n) {
          throw new Error("Amount must be positive.");
        }
      } catch (parseError) {
        console.error("useErc20Transfer: Error parsing amount.", {
          humanAmount,
          decimals,
          parseError,
        });
        throw new Error(`Invalid amount format.`); // Не показываем детали ошибки парсинга пользователю
      }

      // 3. Вызов writeContract, обернутый в Promise
      console.info(`useErc20Transfer: Initiating transfer...`, {
        tokenAddress,
        recipientAddress,
        humanAmount,
        amountAsBigInt,
      });
      return new Promise((resolve, reject) => {
        writeContract(
          {
            abi: erc20Abi, // Стандартный ABI для ERC20 transfer
            address: tokenAddress, // Динамический адрес токена
            functionName: "transfer",
            args: [recipientAddress, amountAsBigInt], // Получатель и сумма в BigInt
          },
          {
            onSuccess: (txHash) => {
              console.log(
                `useErc20Transfer: Transaction sent successfully. Hash: ${txHash}`,
              );
              resolve(txHash); // Успешно -> разрешаем Promise с хэшем транзакции
            },
            onError: (err) => {
              console.error(`useErc20Transfer: Transaction failed.`, err);
              reject(err); // Ошибка -> отклоняем Promise с ошибкой
            },
          },
        );
      });
    },
    [writeContract, tokenAddress, decimals],
  ); // Зависимости для useCallback

  // Возвращаем функцию и состояние из useWriteContract
  return {
    transferToken,
    isPending, // Состояние ожидания подтверждения в кошельке
    error, // Ошибка (например, если пользователь отклонил)
    reset, // Функция сброса состояния ошибки/ожидания
  };
};
