
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { MEDICAL_CROWDFUNDING_CONTRACT } from '@/config/contracts';
import { 
  CampaignBasicInfo,
  CampaignDocuments, 
  DocumentConsent, 
  PatientDetails,
  GuardianDetails,
  MEDICAL_CROWDFUNDING_ABI,
  campaignStatusFromNumber
} from '@/utils/contracts/medicalCrowdfunding';

export const useCrowdfundingContract = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const createCampaign = useCallback(async (
    amountNeededUSD: number,
    duration: number,
    comment: string,
    patientDetails: PatientDetails,
    consent: DocumentConsent,
    documents: CampaignDocuments,
    guardianDetails: GuardianDetails
  ) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a campaign",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_CROWDFUNDING_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_CROWDFUNDING_ABI,
        functionName: 'createCampaign',
        args: [
          BigInt(amountNeededUSD),
          BigInt(duration),
          comment,
          patientDetails,
          consent,
          documents,
          guardianDetails
        ],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Campaign Created",
        description: "Your medical crowdfunding campaign has been submitted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Campaign Creation Failed",
        description: error?.message || "There was an error submitting your campaign. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const voteOnCampaign = useCallback(async (
    campaignId: number,
    support: boolean,
    comment: string
  ) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_CROWDFUNDING_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_CROWDFUNDING_ABI,
        functionName: 'voteOnCampaign',
        args: [BigInt(campaignId), support, comment],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Vote Submitted",
        description: `Your ${support ? "approval" : "rejection"} vote has been recorded.`,
      });
      return true;
    } catch (error: any) {
      console.error("Error voting on campaign:", error);
      toast({
        title: "Vote Failed",
        description: error?.message || "There was an error submitting your vote. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const withdrawFees = useCallback(async (amount: number) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to withdraw fees",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_CROWDFUNDING_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_CROWDFUNDING_ABI,
        functionName: 'withdrawVerifierFees',
        args: [BigInt(amount)],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Fees Withdrawn",
        description: "Your verifier fees have been withdrawn successfully.",
      });
      return true;
    } catch (error: any) {
      console.error("Error withdrawing fees:", error);
      toast({
        title: "Withdrawal Failed",
        description: error?.message || "There was an error withdrawing your fees. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const donateToCampaign = useCallback(async (
    campaignId: number,
    amount: number
  ) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to donate",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_CROWDFUNDING_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_CROWDFUNDING_ABI,
        functionName: 'donate',
        args: [BigInt(campaignId)],
        account: address,
        value: BigInt(amount),
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Donation Successful",
        description: "Thank you for your donation to this medical campaign.",
      });
      return true;
    } catch (error: any) {
      console.error("Error donating to campaign:", error);
      toast({
        title: "Donation Failed",
        description: error?.message || "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const appealCampaign = useCallback(async (campaignId: number) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to appeal",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_CROWDFUNDING_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_CROWDFUNDING_ABI,
        functionName: 'appealCampaign',
        args: [BigInt(campaignId)],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Appeal Submitted",
        description: "Your campaign appeal has been submitted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error("Error appealing campaign:", error);
      toast({
        title: "Appeal Failed",
        description: error?.message || "There was an error submitting your appeal. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

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
