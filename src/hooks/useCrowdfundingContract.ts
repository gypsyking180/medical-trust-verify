
import { useCallback, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { MEDICAL_CROWDFUNDING_CONTRACT } from '@/config/contracts';
import { 
  CampaignBasicInfo,
  CampaignDocuments, 
  DocumentConsent, 
  PatientDetails,
  GuardianDetails
} from '@/utils/contracts/medicalCrowdfunding';

export const useCrowdfundingContract = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createCampaign = useCallback(async (
    amountNeededUSD: number,
    duration: number,
    comment: string,
    patientDetails: PatientDetails,
    consent: DocumentConsent,
    documents: CampaignDocuments,
    guardianDetails: GuardianDetails
  ) => {
    setIsLoading(true);
    try {
      // Implementation will be added when web3 provider is integrated
      toast({
        title: "Campaign Created",
        description: "Your medical crowdfunding campaign has been submitted successfully.",
      });
      return true;
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Campaign Creation Failed",
        description: "There was an error submitting your campaign. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const donateToCampaign = useCallback(async (
    campaignId: number,
    amount: number
  ) => {
    setIsLoading(true);
    try {
      // Implementation will be added when web3 provider is integrated
      toast({
        title: "Donation Successful",
        description: "Thank you for your donation to this medical campaign.",
      });
      return true;
    } catch (error) {
      console.error("Error donating to campaign:", error);
      toast({
        title: "Donation Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const voteOnCampaign = useCallback(async (
    campaignId: number,
    support: boolean,
    comment: string
  ) => {
    setIsLoading(true);
    try {
      // Implementation will be added when web3 provider is integrated
      toast({
        title: "Vote Submitted",
        description: `Your ${support ? "approval" : "rejection"} vote has been recorded.`,
      });
      return true;
    } catch (error) {
      console.error("Error voting on campaign:", error);
      toast({
        title: "Vote Failed",
        description: "There was an error submitting your vote. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const appealCampaign = useCallback(async (
    campaignId: number
  ) => {
    setIsLoading(true);
    try {
      // Implementation will be added when web3 provider is integrated
      toast({
        title: "Appeal Submitted",
        description: "Your campaign appeal has been submitted successfully.",
      });
      return true;
    } catch (error) {
      console.error("Error appealing campaign:", error);
      toast({
        title: "Appeal Failed",
        description: "There was an error submitting your appeal. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const withdrawFees = useCallback(async (
    amount: number
  ) => {
    setIsLoading(true);
    try {
      // Implementation will be added when web3 provider is integrated
      toast({
        title: "Fees Withdrawn",
        description: "Your verifier fees have been withdrawn successfully.",
      });
      return true;
    } catch (error) {
      console.error("Error withdrawing fees:", error);
      toast({
        title: "Withdrawal Failed",
        description: "There was an error withdrawing your fees. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    createCampaign,
    donateToCampaign,
    voteOnCampaign,
    appealCampaign,
    withdrawFees,
    isLoading,
    contractAddress: MEDICAL_CROWDFUNDING_CONTRACT.address,
    contractName: MEDICAL_CROWDFUNDING_CONTRACT.name,
  };
};
