
import { useVerifierApplications } from './contracts/useVerifierApplications';
import { useVerifierVoting } from './contracts/useVerifierVoting';
import { useVerifierProposals } from './contracts/useVerifierProposals';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';

// Define the return type explicitly to help TypeScript
interface VerifierContractHookResult {
  // Applications
  applyAsGenesis: (fullName: string, contactInfo: string, governmentID: string, professionalDocs: string) => Promise<boolean>;
  applyAsHealthPro: (fullName: string, contactInfo: string, governmentID: string, professionalDocs: string) => Promise<boolean>;
  applyAsDao: (fullName: string, contactInfo: string, governmentID: string) => Promise<boolean>;
  
  // Voting
  voteOnApplication: (applicant: string, support: boolean) => Promise<boolean>;
  voteOnRevocation: (targetAddress: string, support: boolean) => Promise<boolean>;
  
  // Proposals
  proposeRevocation: (targetAddress: string) => Promise<boolean>;
  proposeFee: (feeAmount: number) => Promise<boolean>;
  
  // Loading state
  isLoading: boolean;
  
  // Contract info
  contractAddress: string;
  contractName: string;
}

export function useVerifierContract(): VerifierContractHookResult {
  const applications = useVerifierApplications();
  const voting = useVerifierVoting();
  const proposals = useVerifierProposals();
  
  return {
    // Applications
    applyAsGenesis: applications.applyAsGenesis,
    applyAsHealthPro: applications.applyAsHealthPro,
    applyAsDao: applications.applyAsDao,
    
    // Voting
    voteOnApplication: voting.voteOnApplication,
    voteOnRevocation: voting.voteOnRevocation,
    
    // Proposals
    proposeRevocation: proposals.proposeRevocation,
    proposeFee: proposals.proposeFee,
    
    // Loading state
    isLoading: applications.isLoading || voting.isLoading || proposals.isLoading,
    
    // Contract info
    contractAddress: MEDICAL_VERIFIER_CONTRACT.address,
    contractName: MEDICAL_VERIFIER_CONTRACT.name,
  };
}
