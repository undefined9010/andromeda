import { Banner } from "@/components/ui/banner.tsx";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";

export const Consent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (consentGiven) {
      setIsOpen(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsOpen(false);
  };

  return (
    <Banner
      rounded="default"
      className={`${isOpen ? "visible" : "hidden"} absolute bottom-0 shadow-lg shadow-black/5 bg-[#07c1b630] backdrop-blur-[2px] border-0 border-t border-t-[#07c1b650] z-[9999]`}
    >
      <div className="w-full">
        <div className="flex flex-col justify-between gap-6 md:items-center">
          <p className="text-sm md:text-md text-center text-white">
            We use cookies to improve your experience, analyze site usage, and
            show personalized content.
          </p>
          <div className="flex w-full justify-center shrink-0 gap-2 max-md:flex-wrap">
            <Button
              size="lg"
              className="cursor-pointer bg-[#07c1b6]"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer"
              onClick={handleDecline}
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </Banner>
  );
};
