import React from 'react';
import { MotionProps, motion } from 'framer-motion';

interface ProfileCardProps extends MotionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  icon, 
  title, 
  content, 
  color, 
  bgColor, 
  darkBgColor,
  className = "",
  ...motionProps
}) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      {...motionProps}
    >
      <h2 className={`text-xl font-semibold mb-4 flex items-center gap-3 ${color}`}>
        <div className={`${bgColor} ${darkBgColor} p-2.5 rounded-full`}>
          {icon}
        </div>
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 pl-11">
        {content}
      </p>
    </motion.div>
  );
};

export default ProfileCard;