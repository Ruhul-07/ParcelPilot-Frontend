import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-8xl font-extrabold text-primary drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Animated Subtext */}
      <motion.p
        className="text-2xl text-gray-600 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Fun Illustration */}
      <motion.img
        src="/src/assets/404 error with portals-amico.png"
        alt="404 Illustration"
        className="w-80 mt-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white text-lg font-semibold rounded-full shadow-lg hover:bg-secondary transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
