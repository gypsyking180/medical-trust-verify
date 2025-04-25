
import { useState, useCallback } from 'react';
import { useBaseContract } from './useBaseContract';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';
import { MEDICAL_VERIFIER_ABI } from '@/utils/contracts/medicalVerifier';

export const useVerifierVoting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, publicClient, walletClient, toast } = useBaseContract();

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
      const { request } = await publicClient.simulateContract({
        address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
        abi: MEDICAL_VERIFIER_ABI,
        functionName: 'finalizeApplication',
        args: [applicant as `0x${string}`],
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
        functionName: 'finalizeRevocation',
        args: [targetAddress as `0x${string}`],
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

  return {
    voteOnApplication,
    voteOnRevocation,
    isLoading
  };
};
