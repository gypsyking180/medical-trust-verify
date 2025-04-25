
import { useState, useCallback } from 'react';
import { useBaseContract } from './useBaseContract';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';
import { MEDICAL_VERIFIER_ABI } from '@/utils/contracts/medicalVerifier';

export const useVerifierProposals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, publicClient, walletClient, toast } = useBaseContract();

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
    proposeRevocation,
    isLoading
  };
};
