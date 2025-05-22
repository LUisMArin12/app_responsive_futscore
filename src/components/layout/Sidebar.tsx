import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, CalendarDays, ClipboardList, TrendingUp, Info } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-primary-600 dark:text-white">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-md ${
                  isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={onClose}
              >
                <Info size={20} className="mr-3" />
                <span>Informacion General</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/schedules" 
                className={({ isActive }) => `flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-md ${
                  isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={onClose}
              >
                <CalendarDays size={20} className="mr-3" />
                <span>Horarios de partidos</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/reservations" 
                className={({ isActive }) => `flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-md ${
                  isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={onClose}
              >
                <ClipboardList size={20} className="mr-3" />
                <span>Reservaciones</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/results" 
                className={({ isActive }) => `flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-md ${
                  isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={onClose}
              >
                <TrendingUp size={20} className="mr-3" />
                <span>Resultados</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;