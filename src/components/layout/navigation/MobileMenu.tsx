
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, UserCheck, Users } from 'lucide-react';
import { NavItem } from './navItems';

interface MobileMenuProps {
  isOpen: boolean;
  navigationItems: NavItem[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navigationItems, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden p-4 bg-white shadow-lg rounded-b-lg">
      <div className="flex flex-col space-y-2 pt-2 pb-3">
        {navigationItems.map((item) => (
          'dropdown' in item && item.dropdown ? (
            <div key={item.title} className="px-3 py-2">
              <div className="flex items-center text-base font-medium text-gray-800 mb-2">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </div>
              <div className="pl-6 flex flex-col space-y-2">
                {'children' in item && item.children ? (
                  item.children.map(child => (
                    <Link
                      key={child.title}
                      to={child.path}
                      className="flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                      onClick={onClose}
                    >
                      {child.icon}
                      <span>{child.title}</span>
                    </Link>
                  ))
                ) : (
                  <>
                    <Link 
                      to="/apply/genesis"
                      className="flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                      onClick={onClose}
                    >
                      <Shield className="mr-2" size={16} />
                      <span>Apply as Genesis Member</span>
                    </Link>
                    <Link 
                      to="/apply/health"
                      className="flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                      onClick={onClose}
                    >
                      <UserCheck className="mr-2" size={16} />
                      <span>Apply as Health Professional</span>
                    </Link>
                    <Link 
                      to="/apply/dao"
                      className="flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                      onClick={onClose}
                    >
                      <Users className="mr-2" size={16} />
                      <span>Apply as DAO</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Link
              key={item.title}
              to={item.path}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-gray-800"
              onClick={onClose}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
