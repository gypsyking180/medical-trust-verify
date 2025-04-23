
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UserRole, useUserRole } from '@/hooks/useUserRole';
import { Heart, Info, Shield, Ambulance, User, FileText, Vote, Award, Menu, X, Users, UserCheck, Trash2, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define types for navigation items
type BaseNavItem = {
  title: string;
  icon: React.ReactNode;
};

type LinkNavItem = BaseNavItem & {
  path: string;
  dropdown?: never;
};

type DropdownNavItem = BaseNavItem & {
  dropdown: true;
  children?: Array<{
    title: string;
    icon: React.ReactNode;
    path: string;
  }>;
  path?: never;
};

type NavItem = LinkNavItem | DropdownNavItem;

const NavBar = () => {
  const { userRole, isLoading } = useUserRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define navigation links based on user role
  const getNavigationItems = (): NavItem[] => {
    // Common links for all roles
    const commonLinks: NavItem[] = [
      {
        title: 'Browse Campaign',
        path: '/campaigns',
        icon: <Heart className="text-medical-green" size={20} />
      },
      {
        title: 'How It Works',
        path: '/how-it-works',
        icon: <Info size={20} />
      }
    ];

    // Role-specific links
    if (userRole === UserRole.Owner) {
      return [
        ...commonLinks,
        {
          title: 'Verification Portal',
          path: '/verification',
          icon: <Shield size={20} />
        },
        {
          title: 'Emergency Portal',
          path: '/emergency',
          icon: <Ambulance size={20} />
        }
      ];
    } else if (userRole === UserRole.Verifier) {
      return [
        ...commonLinks,
        {
          title: 'Become Verifier',
          dropdown: true,
          icon: <User size={20} />,
          children: [
            {
              title: "Apply as Genesis Member",
              icon: <Shield className="mr-2" size={18} />,
              path: "/apply/genesis"
            },
            {
              title: "Apply as Health Professional",
              icon: <UserCheck className="mr-2" size={18} />,
              path: "/apply/health"
            },
            {
              title: "Apply as DAO",
              icon: <Users className="mr-2" size={18} />,
              path: "/apply/dao"
            }
          ]
        },
        {
          title: 'Proposal Portal',
          dropdown: true,
          icon: <FileText size={20} />,
          children: [
            {
              title: "Revocation Proposal",
              icon: <Trash2 className="mr-2" size={18} />,
              path: "/proposals/revocation"
            },
            {
              title: "Fee Proposal",
              icon: <DollarSign className="mr-2" size={18} />,
              path: "/proposals/fee"
            }
          ]
        },
        {
          title: 'Vote Portal',
          path: '/vote',
          icon: <Vote size={20} />
        },
        {
          title: 'Claim Reward',
          path: '/rewards',
          icon: <Award size={20} />
        }
      ];
    } else {
      return [
        ...commonLinks,
        {
          title: 'Become Verifier',
          dropdown: true,
          icon: <User size={20} />,
          children: [
            {
              title: "Apply as Genesis Member",
              icon: <Shield className="mr-2" size={18} />,
              path: "/apply/genesis"
            },
            {
              title: "Apply as Health Professional",
              icon: <UserCheck className="mr-2" size={18} />,
              path: "/apply/health"
            },
            {
              title: "Apply as DAO",
              icon: <Users className="mr-2" size={18} />,
              path: "/apply/dao"
            }
          ]
        }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-primary">
              <Heart className="mr-2 text-secondary" size={24} />
              careBridge
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              'dropdown' in item && item.dropdown ? (
                <DropdownMenu key={item.title}>
                  <DropdownMenuTrigger className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 text-gray-800">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
                    {/* Dropdown buttons (supports children for dropdowns like Become Verifier and Proposal Portal) */}
                    {'children' in item && item.children ? (
                      item.children.map(child => (
                        <DropdownMenuItem asChild key={child.title}>
                          <Link to={child.path} className="flex items-center">
                            {child.icon}
                            <span>{child.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/apply/genesis" className="flex items-center">
                            <Shield className="mr-2" size={18} />
                            <span>Apply as Genesis Member</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/apply/health" className="flex items-center">
                            <UserCheck className="mr-2" size={18} />
                            <span>Apply as Health Professional</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/apply/dao" className="flex items-center">
                            <Users className="mr-2" size={18} />
                            <span>Apply as DAO</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
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
            <div className="ml-4">
              <ConnectButton showBalance={false} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <div className="mr-2">
              <ConnectButton showBalance={false} chainStatus="none" accountStatus="address" />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
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
                          onClick={() => setIsMenuOpen(false)}
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
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Shield className="mr-2" size={16} />
                          <span>Apply as Genesis Member</span>
                        </Link>
                        <Link 
                          to="/apply/health"
                          className="flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <UserCheck className="mr-2" size={16} />
                          <span>Apply as Health Professional</span>
                        </Link>
                        <Link 
                          to="/apply/dao"
                          className="flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

