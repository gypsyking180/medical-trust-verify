
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppealCampaignButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={() => navigate('/campaigns/appeal')}
    >
      <FileText className="mr-2" size={18} />
      Appeal Campaign
    </Button>
  );
};

export default AppealCampaignButton;
