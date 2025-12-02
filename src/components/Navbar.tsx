import { motion } from 'framer-motion';
import { Link } from '../router';
import { useState, useEffect } from 'react';
import profilePicture from '../assets/profile-picture.jpg';

export const Navbar = () => {
  const [time, setTime] = useState(''); 

  
  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setTime('HOPE YOUR MORNING FEELS FRESH☀️');
      } else if (hour >= 12 && hour < 17) {
        setTime('KEEP THE MOMENTUM GOING⚡');
      } else if (hour >= 17 && hour < 21) {
        setTime('A COOL AND RELAXING EVENING TO YOU😉');
      } else {
        setTime('THE NIGHT IS CALM, HOPE YOU ARE TOO⭐');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <img
              src={profilePicture}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover shadow-sm"
            />

            <span>ATS Pro</span>
          </Link>

          <div className="flex items-center gap-6">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {time}
            </span>

            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Home
            </Link>

            <Link
              to="/upload"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Upload Resume
            </Link>
          </div>

        </div>
      </div>
    </motion.nav>
  );
};
