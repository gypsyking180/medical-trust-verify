
import { useState, useCallback } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { useToast } from "@/hooks/use-toast";
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';
import { MEDICAL_VERIFIER_ABI } from '@/utils/contracts/medicalVerifier';

export const useVerifierContract = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();

  const applyAsGenesis = useCallback(async (
    fullName: string,
    contactInfo: string,
    governmentID: string,
    professionalDocs: string
  ) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to apply",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_VERIFIER_ABI,
        functionName: 'applyAsGenesis',
        args: [fullName, contactInfo, governmentID, professionalDocs],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Application Submitted",
        description: "Your Genesis member application has been submitted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error("Error applying as Genesis:", error);
      toast({
        title: "Application Failed",
        description: error?.message || "There was an error submitting your application.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const applyAsHealthPro = useCallback(async (
    fullName: string,
    contactInfo: string,
    governmentID: string,
    professionalDocs: string
  ) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to apply",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_VERIFIER_ABI,
        functionName: 'applyAsHealthProfessional',
        args: [fullName, contactInfo, governmentID, professionalDocs],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Application Submitted",
        description: "Your Health Professional application has been submitted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error("Error applying as Health Professional:", error);
      toast({
        title: "Application Failed",
        description: error?.message || "There was an error submitting your application.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const applyAsDao = useCallback(async (
    fullName: string,
    contactInfo: string,
    governmentID: string
  ) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to apply",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_VERIFIER_ABI,
        functionName: 'applyAsDaoVerifier',
        args: [fullName, contactInfo, governmentID],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Application Submitted",
        description: "Your DAO member application has been submitted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error("Error applying as DAO member:", error);
      toast({
        title: "Application Failed",
        description: error?.message || "There was an error submitting your application.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const voteOnApplication = useCallback(async (applicant: string, support: boolean) => {
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
      // Fix the function name and argument types to match the ABI
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_VERIFIER_ABI,
        functionName: 'voteOnApplication',
        args: [applicant as `0x${string}`, support],
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
      console.error("Error voting on application:", error);
      toast({
        title: "Vote Failed",
        description: error?.message || "There was an error submitting your vote.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const voteOnRevocation = useCallback(async (targetAddress: string, support: boolean) => {
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
        address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_VERIFIER_ABI,
        functionName: 'voteOnRevocation',
        args: [targetAddress as `0x${string}`, support],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Vote Submitted",
        description: `Your ${support ? "approval" : "rejection"} vote for revocation has been recorded.`,
      });
      return true;
    } catch (error: any) {
      console.error("Error voting on revocation:", error);
      toast({
        title: "Vote Failed",
        description: error?.message || "There was an error submitting your vote.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  const proposeRevocation = useCallback(async (targetAddress: string) => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to propose revocation",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_VERIFIER_ABI,
        functionName: 'proposeRevocation',
        args: [targetAddress as `0x${string}`],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      toast({
        title: "Proposal Submitted",
        description: "Your revocation proposal has been submitted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error("Error proposing revocation:", error);
      toast({
        title: "Proposal Failed",
        description: error?.message || "There was an error submitting your proposal.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, walletClient, toast]);

  return {
    applyAsGenesis,
    applyAsHealthPro,
    applyAsDao,
    voteOnApplication,
    voteOnRevocation,
    proposeRevocation,
    isLoading,
    contractAddress: MEDICAL_VERIFIER_CONTRACT.address,
    contractName: MEDICAL_VERIFIER_CONTRACT.name,
  };
};
