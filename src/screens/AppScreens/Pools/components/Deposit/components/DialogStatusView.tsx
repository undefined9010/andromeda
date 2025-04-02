import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoaderOne from "@/components/ui/loader-one";
import { Button } from "@/components/ui/button";

interface DialogStatusViewProps {
  isLoading: boolean;
  loadingText?: string;
  error: string | null;
  errorTitle?: string;
  onClose?: () => void;
}

export const DialogStatusView: React.FC<
  React.PropsWithChildren<DialogStatusViewProps>
> = ({
  isLoading,
  loadingText = "Processing...",
  error,
  errorTitle = "Error",
  onClose,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="h-[200px] flex gap-8 flex-col items-center justify-center">
        <DialogHeader className="text-center">
          <DialogTitle className="text-white">Loading</DialogTitle>
          <DialogDescription className="text-white pt-2">
            {loadingText}
          </DialogDescription>
        </DialogHeader>
        <LoaderOne />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[200px] flex flex-col gap-4 items-center justify-center text-center">
        <DialogHeader>
          <DialogTitle className="text-red-400">{errorTitle}</DialogTitle>
          <DialogDescription className="text-red-300 pt-2">
            {error}
          </DialogDescription>
        </DialogHeader>
        {onClose && (
          <Button onClick={onClose} variant="destructive" size="sm">
            Close
          </Button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};
