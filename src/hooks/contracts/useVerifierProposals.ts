
import { useState, useCallback } from 'react';
import { useBaseContract } from './useBaseContract';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';
import { MEDICAL_VERIFIER_ABI } from '@/utils/contracts/medicalVerifier';

interface VerifierProposalsHook {
  proposeRevocation: (targetAddress: string) => Promise<boolean>;
  proposeFee: (feeAmount: number) => Promise<boolean>;
  isLoading: boolean;
}

export const useVerifierProposals = (): VerifierProposalsHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, publicClient, walletClient, toast } = useBaseContract();

  const proposeRevocation = useCallback(async (targetAddress: string): Promise<boolean> => {
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

  const proposeFee = useCallback(async (feeAmount: number): Promise<boolean> => {
    if (!address || !walletClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to propose a fee change",
        variant: "destructive",
      });
      return false;
    }

    if (feeAmount < 100 || feeAmount > 300) {
      toast({
        title: "Invalid fee amount",
        description: "Fee must be between 100 and 300 basis points (1-3%)",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      // Mock implementation - would call a contract method in production
      console.log(`Proposing fee change to ${feeAmount} basis points`);
      
      // Simulate delay for the transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Fee Proposal Submitted",
        description: `Your proposal for a ${feeAmount / 100}% fee has been submitted successfully.`,
      });
      return true;
    } catch (error: any) {
      console.error("Error proposing fee change:", error);
      toast({
        title: "Proposal Failed",
        description: error?.message || "There was an error submitting your fee proposal.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, walletClient, toast]);

  return {
    proposeRevocation,
    proposeFee,
    isLoading
  };
};
