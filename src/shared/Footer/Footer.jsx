import { CiDeliveryTruck } from "react-icons/ci";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-evenly items-center px-6">
        {/* Logo and Description */}
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
        {/* <CiDeliveryTruck className="text-[#f2ae1c] text-5xl"  /> */}
          <h1 className="text-3xl font-bold mb-2">ParcelPilot</h1>
          <p className="text-lg text-center lg:text-left">
            Fast and Safe
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-2 text-center">
            <li>
              <Link to="/" className="hover:text-gray-200">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-200">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-200">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-4 items-center text-3xl">
          <a href="#" className="hover:text-gray-200" aria-label="Facebook">
          <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-200" aria-label="Twitter">
          <FaXTwitter />
          </a>
          <a href="#" className="hover:text-gray-200" aria-label="LinkedIn">
          <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6">
        <p>&copy; {new Date().getFullYear()} ParcelPilot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
