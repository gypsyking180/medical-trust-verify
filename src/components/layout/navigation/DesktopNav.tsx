
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavItem } from './navItems';

interface DesktopNavProps {
  navigationItems: NavItem[];
  onOpenDialog: (type: 'revocation' | 'fee') => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navigationItems, onOpenDialog }) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {navigationItems.map((item) => (
        'dropdown' in item && item.dropdown ? (
          <DropdownMenu key={item.title}>
            <DropdownMenuTrigger className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 text-gray-800">
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
              {'children' in item && item.children ? (
                item.children.map(child => (
                  child.path === "/proposals/revocation" || child.path === "/proposals/fee" ? (
                    <DropdownMenuItem key={child.title} asChild>
                      <button
                        className="flex items-center w-full text-left focus:outline-none"
                        onClick={() => onOpenDialog(child.path === "/proposals/revocation" ? 'revocation' : 'fee')}
                        type="button"
                      >
                        {child.icon}
                        <span>{child.title}</span>
                      </button>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem key={child.title} asChild>
                      <Link to={child.path} className="flex items-center">
                        {child.icon}
                        <span>{child.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                ))
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 text-gray-800"
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </Link>
        )
      ))}
    </div>
  );
};

export default DesktopNav;
