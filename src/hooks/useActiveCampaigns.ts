
import { useQuery } from '@tanstack/react-query';
import { CampaignStatus } from '@/utils/contracts/medicalCrowdfunding';
import { MEDICAL_CROWDFUNDING_CONTRACT } from '@/config/contracts';

export const useActiveCampaigns = () => {
  return useQuery({
    queryKey: ['activeCampaigns'],
    queryFn: async () => {
      // This is a placeholder for the actual implementation
      // You'll need to implement the contract call to fetch active campaigns
      const campaigns = []; // Fetch from contract
      return campaigns.filter(campaign => campaign.status === CampaignStatus.ACTIVE);
    },
  });
};
