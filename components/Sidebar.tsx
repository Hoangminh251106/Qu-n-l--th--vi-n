import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UsersIcon, ClipboardListIcon, ChartPieIcon, MailIcon, XIcon } from './icons/Icons';
import { SettingsIcon } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navItems = [
 
  { to: '/home', label: 'Home', icon: <HomeIcon /> },
  { to: '/dashboard', label: 'Dashboard', icon: <ChartPieIcon /> },
  { to: '/books', label: 'Books', icon: <BookOpenIcon /> },
  { to: '/members', label: 'Members', icon: <UsersIcon /> },
  { to: '/borrow', label: 'Borrow/Return', icon: <ClipboardListIcon /> },
  { to: '/contact', label: 'Contact', icon: <MailIcon /> },
  { to: '/adminsetting', label: 'Admin Settings', icon: <SettingsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const linkClasses = "flex items-center px-4 py-2 mt-5 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700";
  const activeLinkClasses = "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200";

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 lg:static lg:inset-0 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center">
            <BookOpenIcon className="w-8 h-8 text-indigo-500" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">LMS</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 dark:text-gray-400">
            <XIcon />
          </button>
        </div>

        <nav className="mt-5 px-2">
          {navItems.map(item => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              {item.icon}
              <span className="mx-4 font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;