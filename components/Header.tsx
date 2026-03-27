
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon } from './icons/Icons';
import { Link } from 'react-router-dom';


interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b-2 dark:border-gray-700">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden">
          <MenuIcon />
        </button>
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200 ml-4 lg:ml-0">Library Management System</h1>
      </div>

      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
