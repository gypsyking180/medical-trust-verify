
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUserRole } from '@/hooks/useUserRole';
import { Heart, Menu, X } from 'lucide-react';
import { getNavigationItems } from './navigation/navItems';
import DesktopNav from './navigation/DesktopNav';
import MobileMenu from './navigation/MobileMenu';
import RevocationProposalDialog from "@/components/forms/RevocationProposalDialog";
import FeeProposalDialog from "@/components/forms/FeeProposalDialog";

const NavBar = () => {
  const { userRole, isLoading } = useUserRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [revocationDialogOpen, setRevocationDialogOpen] = useState(false);
  const [feeDialogOpen, setFeeDialogOpen] = useState(false);

  const navigationItems = getNavigationItems(userRole);

  const handleDialogOpen = (type: 'revocation' | 'fee') => {
    if (type === 'revocation') {
      setRevocationDialogOpen(true);
    } else {
      setFeeDialogOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-xl font-bold text-primary">
                <Heart className="mr-2 text-secondary" size={24} />
                careBridge
              </Link>
            </div>

            <DesktopNav 
              navigationItems={navigationItems} 
              onOpenDialog={handleDialogOpen}
            />

            <div className="hidden md:flex items-center">
              <ConnectButton showBalance={false} chainStatus="none" accountStatus="address" />
            </div>

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

        <MobileMenu 
          isOpen={isMenuOpen} 
          navigationItems={navigationItems}
          onClose={() => setIsMenuOpen(false)}
        />
      </nav>
      <RevocationProposalDialog open={revocationDialogOpen} onOpenChange={setRevocationDialogOpen} />
      <FeeProposalDialog open={feeDialogOpen} onOpenChange={setFeeDialogOpen} />
    </>
  );
};

export default NavBar;
