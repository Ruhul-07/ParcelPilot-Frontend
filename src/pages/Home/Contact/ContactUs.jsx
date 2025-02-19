import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const ContactUs = () => {
  return (
    <div id="contact" className="px-12 mt-2">
      <h2 className="text-3xl font-bold text-center text-text">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-6">
            Feel free to reach out to me using the contact form or the details below.
          </p>
          <div className="flex items-center mb-4">
            <MdLocationOn className="text-green-500 text-2xl mr-3" />
            <p className="text-gray-700">Dhaka, Bangladesh</p>
          </div>
          <div className="flex items-center mb-4">
            <MdEmail className="text-green-500 text-2xl mr-3" />
            <p className="text-gray-700">ruhulaminbabu93@gmail.com</p>
          </div>
          <div className="flex items-center mb-4">
            <MdPhone className="text-green-500 text-2xl mr-3" />
            <p className="text-gray-700">01627183014</p>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mt-6">Follow Me</h4>
          <div className="flex space-x-4 mt-4">
            {/* Replace # with actual links */}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 text-xl transition duration-300"
            >
              <BsFacebook />
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-600 text-xl transition duration-300"
            >
              <FaSquareInstagram />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700 text-xl transition duration-300"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700 text-xl transition duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
