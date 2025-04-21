import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, PlusCircle, Gift, FileText, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { toast } = useToast();

  const handleCreateCampaignClick = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet first to create a campaign.",
        variant: "destructive",
      });
      
      // Connect using the first available connector (usually injected - MetaMask)
      const connector = connectors[0];
      if (connector) {
        connect({ connector });
      }
      return;
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500">
                Decentralized Medical Crowdfunding
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl text-medical-blue">
                <span className="block">Medical Crowdfunding</span>
                <span className="block text-secondary">Powered by Blockchain</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              careBridge connects patients in need with verified medical professionals and donors 
              through a transparent blockchain-based platform, ensuring your contributions 
              reach those who truly need medical assistance.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                {isConnected ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" className="w-full sm:w-auto">
                        <PlusCircle className="mr-2" size={18} />
                        Create Campaign
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/campaigns/new" className="w-full flex items-center">
                          <FilePlus className="mr-2" size={18} />
                          New Campaign
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/campaigns/appeal" className="w-full flex items-center">
                          <FileText className="mr-2" size={18} />
                          Appeal Campaign
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button size="lg" className="w-full sm:w-auto" onClick={handleCreateCampaignClick}>
                    <PlusCircle className="mr-2" size={18} />
                    Create Campaign
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="mt-3 sm:mt-0 w-full sm:w-auto">
                  <Link to="/donate">
                    <Gift className="mr-2" size={18} />
                    Donate
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-64 bg-gradient-to-r from-blue-200 to-medical-blue rounded-t-lg flex items-center justify-center">
                  <Heart className="text-white" size={80} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">Verified Medical Funding</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our platform ensures all medical campaigns are verified by licensed healthcare professionals 
                    before accepting donations, providing transparency and trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
