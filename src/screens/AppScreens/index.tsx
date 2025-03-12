import { Button } from "@/components/ui/button.tsx";
import { useMainPage } from "@/hooks/useMainPage.ts";

export const AppScreens = () => {
  const { handleOpenModal, handleOpenNav, approveTokens } = useMainPage();

  return (
    <div>
      {/* Button to trigger wallet modal */}
      <Button onClick={approveTokens}>Approve tokens </Button>
      <Button onClick={handleOpenModal}>Open Wallet</Button>
      {/* Other buttons */}
      <Button onClick={handleOpenNav}>Nav</Button>
    </div>
  );
};
