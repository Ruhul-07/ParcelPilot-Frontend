import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Animated Spinner */}
      <motion.div
        className="animate-spin rounded-full border-t-4 border-primary w-16 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.p
        className="text-xl text-gray-600 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
