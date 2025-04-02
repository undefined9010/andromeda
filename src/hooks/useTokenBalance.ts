// hooks/useTokenBalance.ts
import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi, type Address, formatUnits } from "viem"; // Импортируем formatUnits для форматирования
import { useMemo } from "react"; // Используем useMemo для стабильности результатов

interface UseTokenBalanceReturn {
  balance?: bigint; // "Сырой" баланс в виде bigint
  decimals?: number; // Десятичные знаки токена
  symbol?: string; // Символ токена
  formattedBalance: string; // Отформатированный баланс как строка (например, "123.45")
  isLoading: boolean; // Состояние загрузки
  error: Error | null; // Объект ошибки, если вызов useReadContracts не удался
}

export const useTokenBalance = (
  tokenAddress: Address | undefined,
): UseTokenBalanceReturn => {
  const { address: accountAddress, isConnected } = useAccount();

  // Мемоизируем массив контрактов, чтобы он не создавался заново при каждом рендере
  const contractCalls = useMemo(
    () =>
      tokenAddress && accountAddress
        ? [
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [accountAddress], // Убедимся, что accountAddress не undefined
            } as const, // Добавляем 'as const' для лучшего вывода типов wagmi
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "decimals",
            } as const,
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "symbol",
            } as const,
          ]
        : [],
    [tokenAddress, accountAddress],
  ); // Зависимости: адрес токена и адрес аккаунта

  const {
    data: contractData,
    isLoading,
    error: readContractsError,
  } = useReadContracts({
    allowFailure: true, // Оставляем true, чтобы ошибки отдельных вызовов не ломали все
    contracts: contractCalls,
    query: {
      // Включаем запрос только если все данные есть и кошелек подключен
      enabled:
        isConnected &&
        !!accountAddress &&
        !!tokenAddress &&
        contractCalls.length > 0,
      // staleTime: 5000, // Опционально: кэшировать на 5 секунд
      // refetchInterval: 15000, // Опционально: перезапрашивать каждые 15 секунд
    },
  });

  // Обрабатываем и форматируем результат с помощью useMemo
  const result = useMemo(() => {
    const defaultReturn: Omit<UseTokenBalanceReturn, "isLoading" | "error"> = {
      formattedBalance: "0.00", // Баланс по умолчанию
    };

    // Если загрузка, нет данных или данные неполные, возвращаем дефолт
    if (isLoading || !contractData || contractData.length !== 3) {
      return defaultReturn;
    }

    // Разбираем результаты вызовов
    const [balanceResult, decimalsResult, symbolResult] = contractData;

    let balance: bigint | undefined = undefined;
    let decimals: number | undefined = undefined;
    let symbol: string | undefined = undefined;
    let formattedBalance = "0.00"; // Инициализируем отформатированный баланс

    // Извлекаем данные, если вызовы успешны
    if (balanceResult?.status === "success") {
      balance = balanceResult.result;
    }
    if (decimalsResult?.status === "success") {
      decimals = decimalsResult.result;
    }
    if (symbolResult?.status === "success") {
      symbol = symbolResult.result;
    }

    // Форматируем баланс, если есть баланс и десятичные знаки
    if (balance !== undefined && decimals !== undefined) {
      try {
        // Используем formatUnits из viem для безопасного форматирования
        // toFixed(2) оставляет 2 знака после запятой
        formattedBalance = parseFloat(formatUnits(balance, decimals)).toFixed(
          2,
        );
      } catch (e) {
        console.error("Error formatting balance:", e);
        formattedBalance = "0.00"; // Возврат к дефолту при ошибке форматирования
      }
    }

    return { balance, decimals, symbol, formattedBalance };
  }, [contractData, isLoading]); // Зависимости: данные контракта и статус загрузки

  // Возвращаем обработанные результаты и статус/ошибку хука
  return {
    ...result,
    isLoading,
    error: readContractsError, // Возвращаем общую ошибку useReadContracts
  };
};
