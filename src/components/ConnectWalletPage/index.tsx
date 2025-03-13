import { useMainPage } from "@/hooks/useMainPage";
import noWallet from "@/assets/no-wallet.png";
import { Link } from "react-router";

export const ConnectWalletPage = () => {
  const { handleOpenModal } = useMainPage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      <img src={noWallet} alt="Connect Wallet" className="w-52 h-64 mb-6" />

      <h2 className="text-xl sm:text-2xl text-center font-semibold mb-8">
        Please connect your wallet to continue
      </h2>

      <div className="flex flex-col pt-6 sm:pt-0 sm:flex-row gap-4">
        <button
          onClick={handleOpenModal}
          className="px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
        >
          Connect Wallet
        </button>

        <Link
          to="https://docs.reown.com"
          target="_blank"
          className="px-8 py-2 sm:py-3 border border-teal-400 text-teal-400 rounded-full font-medium hover:bg-teal-400/10 transition-colors"
        >
          Read our Docs
        </Link>
      </div>
    </div>
  );
};
