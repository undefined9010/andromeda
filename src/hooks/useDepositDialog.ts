import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useYieldsStore,
  type YieldsData,
} from "@/stores/deposit-form-store.ts";

type DialogStep = "idle" | "loading" | "error" | "selecting" | "form";

interface UseDepositDialogReturn {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  handleOpenChange: (open: boolean) => void;
  step: DialogStep;
  setStep: Dispatch<SetStateAction<DialogStep>>;
  selectedYieldData: YieldsData | null;
  setSelectedYieldData: (data: YieldsData | null) => void;
  error: string | null;
  setError: (message: string | null) => void;
}

export const useDepositDialog = (): UseDepositDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DialogStep>("idle");
  const [error, setError] = useState<string | null>(null);

  const { yieldsData, setYieldsData } = useYieldsStore();

  const openDialog = useCallback(() => {
    setIsOpen(true);
    setStep("loading");
    setError(null);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        setStep("idle");
        setYieldsData(null);
        setError(null);
      }
    },
    [setYieldsData],
  );

  useEffect(() => {
    if (error) {
      setStep("error");
    }
  }, [error]);

  return {
    isOpen,
    openDialog,
    closeDialog,
    handleOpenChange,
    step,
    setStep,
    selectedYieldData: yieldsData,
    setSelectedYieldData: setYieldsData,
    error,
    setError,
  };
};
