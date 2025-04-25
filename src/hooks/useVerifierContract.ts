
import { useVerifierApplications } from './contracts/useVerifierApplications';
import { useVerifierVoting } from './contracts/useVerifierVoting';
import { useVerifierProposals } from './contracts/useVerifierProposals';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';

export function useVerifierContract() {
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
