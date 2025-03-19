
import React from 'react';
import { 
  Menu, 
  Search, 
  Bell
} from 'lucide-react';

interface TopBarProps {
  toggleSidebar: () => void;
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  user: { name: string; email: string } | null;
}

const TopBar: React.FC<TopBarProps> = ({ 
  toggleSidebar, 
  showProfile, 
  setShowProfile, 
  user 
}) => {
  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white mr-4 p-1 rounded hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white py-1.5 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-clipvobe-cyan w-64"
          />
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {user && (
          <button 
            className="flex items-center space-x-2 text-gray-400 hover:text-white pr-2 pl-1 py-1 rounded hover:bg-gray-800" 
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="w-7 h-7 rounded-full bg-clipvobe-cyan/20 flex items-center justify-center text-clipvobe-cyan">
              {user.name.charAt(0)}
            </div>
            <span className="text-sm">{user.name.split(' ')[0]}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default TopBar;
