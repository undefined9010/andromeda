import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer
      className={`fixed left-0 w-full bg-[#6e89e010] backdrop-blur-lg shadow-lg  text-white py-8 transition-all duration-300 ease-in-out bottom-0`}
    >
      <div className="max-w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <nav className="space-x-6">
            <Link
              to="/privacy"
              className="text-gray-400 text-xs sm:text-sm md:text-md hover:text-teal-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 text-xs sm:text-sm md:text-md  hover:text-teal-400"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 text-xs sm:text-sm md:text-md  hover:text-teal-400"
            >
              Contact Us
            </Link>
          </nav>
          <p className="text-xs sm:text-sm md:text-md text-gray-400 ml-8">
            © 2025 Andromeda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
