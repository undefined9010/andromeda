import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-[#6e89e010] backdrop-blur-lg shadow-lg  text-white py-4 md:py-8`}
    >
      <div className="max-w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <nav className="space-x-6">
            <Link
              to="/terms"
              className="text-gray-400 text-xs sm:text-sm md:text-md  hover:text-teal-400"
            >
              Privacy Policy & Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 text-xs sm:text-sm md:text-md  hover:text-teal-400"
            >
              Contact Us
            </Link>
          </nav>
          <p className="hidden md:block text-xs sm:text-sm md:text-md text-gray-400 ml-8">
            © 2025 Andromeda. All rights reserved.
          </p>
        </div>
        <p className="md:hidden text-xs sm:text-sm md:text-md text-gray-400 mt-4">
          © 2025 Andromeda. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
