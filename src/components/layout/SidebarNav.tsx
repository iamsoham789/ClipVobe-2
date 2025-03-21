import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  description?: string;
  subItems?: NavItem[];
  isSpacer?: boolean;
  showPopup?: boolean;
}


interface SidebarNavProps {
  items: NavItem[];
  activeItem: string;
  activeSubItem: string;
  expandedItems: string[];
  sidebarOpen: boolean;
  handleNavigation: (itemId: string, subItemId?: string) => void;
  toggleExpandItem: (itemId: string) => void;
  onProfileClick?: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  activeItem,
  activeSubItem,
  expandedItems,
  sidebarOpen,
  handleNavigation,
  toggleExpandItem,
  onProfileClick,
}) => {
  return (
    <nav
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 transform bg-clipvobe-gray-900 p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Clipvobe</h2>
          <p className="text-sm text-clipvobe-gray-400">Creator Hub</p>
        </div>

        <div className="space-y-1 flex-1 overflow-y-auto">
          {items.map((item) => {
            if (item.isSpacer) {
              return <div key="spacer" className="h-8" />;
            }

            const isActive = activeItem === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.showPopup && onProfileClick) {
                    onProfileClick();
                  } else {
                    handleNavigation(item.id);
                  }
                }}
                className={cn(
                  'w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-clipvobe-cyan/10 text-clipvobe-cyan'
                    : 'text-clipvobe-gray-400 hover:bg-clipvobe-gray-800 hover:text-white'
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="truncate">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;
function handleNavigation(arg0: string) {
  throw new Error('Function not implemented.');
}

