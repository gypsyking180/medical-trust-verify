
import { useState, useCallback } from 'react';
import { useBaseContract } from './useBaseContract';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';
import { MEDICAL_VERIFIER_ABI } from '@/utils/contracts/medicalVerifier';

export const useVerifierApplications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, publicClient, walletClient, toast } = useBaseContract();

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

  return {
    applyAsGenesis,
    applyAsHealthPro,
    applyAsDao,
    isLoading
  };
};
