
import { useVerifierApplications } from './contracts/useVerifierApplications';
import { useVerifierVoting } from './contracts/useVerifierVoting';
import { useVerifierProposals } from './contracts/useVerifierProposals';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';

export const useVerifierContract = () => {
  const applications = useVerifierApplications();
  const voting = useVerifierVoting();
  const proposals = useVerifierProposals();

  return {
    ...applications,
    ...voting,
    ...proposals,
    contractAddress: MEDICAL_VERIFIER_CONTRACT.address,
    contractName: MEDICAL_VERIFIER_CONTRACT.name,
  };
};
