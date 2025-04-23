
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { OWNER_ADDRESS, VERIFIER_ADDRESS } from '@/config/roleAddresses';

export enum UserRole {
  Owner = 'owner',
  Verifier = 'verifier',
  Default = 'default'
}

export const useUserRole = () => {
  const { address, isConnected } = useAccount();
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Default);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!isConnected || !address) {
        setUserRole(UserRole.Default);
        setIsLoading(false);
        return;
      }

      try {
        // Check using the direct address comparison
        const normalizedAddress = address.toLowerCase();
        const normalizedOwnerAddress = OWNER_ADDRESS.toLowerCase();
        const normalizedVerifierAddress = VERIFIER_ADDRESS.toLowerCase();

        if (normalizedAddress === normalizedOwnerAddress) {
          setUserRole(UserRole.Owner);
        } else if (normalizedAddress === normalizedVerifierAddress) {
          setUserRole(UserRole.Verifier);
        } else {
          setUserRole(UserRole.Default);
        }

        // Log the role detection for debugging
        console.log("User role detection:", {
          userAddress: normalizedAddress,
          ownerAddress: normalizedOwnerAddress,
          verifierAddress: normalizedVerifierAddress,
          detectedRole: normalizedAddress === normalizedOwnerAddress ? "Owner" : 
                        normalizedAddress === normalizedVerifierAddress ? "Verifier" : "Default"
        });
      } catch (error) {
        console.error("Error checking user role:", error);
        setUserRole(UserRole.Default);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [address, isConnected]);

  return { userRole, isLoading };
};
