import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Trophy } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {


  return (
    <nav className="bg-primary-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={onMenuClick}
              className="p-2 rounded-md text-white hover:bg-primary-700 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/" className="ml-4 flex items-center space-x-2">
              <Trophy size={28} />
              <span className="font-bold text-xl">FutScore</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;