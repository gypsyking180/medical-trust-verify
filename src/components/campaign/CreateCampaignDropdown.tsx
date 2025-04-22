
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppealCampaignButton from './AppealCampaignButton';

const CreateCampaignDropdown = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto">
          <FilePlus className="mr-2" size={18} />
          Create Campaign
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuItem onClick={() => navigate('/campaigns/new')}>
          <FilePlus className="mr-2" size={18} />
          New Campaign
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AppealCampaignButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateCampaignDropdown;
