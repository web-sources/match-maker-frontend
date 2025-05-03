import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorState: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-[80vh] text-center px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-5 rounded-full mb-6 shadow-lg">
        <Heart className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
        Profile Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md text-lg">
        We couldn&apos;t find the profile information you were looking for. Please try again later.
      </p>
      <motion.button 
        className="mt-8 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Return to Matches
      </motion.button>
    </motion.div>
  );
};

export default ErrorState;