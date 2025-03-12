import { useState, useEffect } from "react";
import { Link } from "react-router";

export const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        setShowFooter((prev) => !prev);

        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isScrolling]);

  return (
    <footer
      className={`fixed left-0 w-full bg-[#6e89e010] backdrop-blur-lg shadow-lg  text-white py-8 transition-all duration-300 ease-in-out ${
        showFooter ? "bottom-0" : "-bottom-40"
      }`}
    >
      <div className="max-w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <nav className="space-x-6">
            <Link
              to="/privacy"
              className="text-gray-400 text-xs sm:text-sm md:text-md lg:text-2xl hover:text-teal-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 text-xs sm:text-sm md:text-md lg:text-2xl hover:text-teal-400"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 text-xs sm:text-sm md:text-md lg:text-2xl hover:text-teal-400"
            >
              Contact Us
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <div className="text-lg font-semibold"></div>
          <p className="text-xs sm:text-sm md:text-md lg:text-2xl text-gray-400">
            © 2025 Andromeda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
