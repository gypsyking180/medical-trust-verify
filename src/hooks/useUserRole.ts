
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';
import { MEDICAL_VERIFIER_CONTRACT } from '@/config/contracts';
import { wagmiConfig } from '@/config/web3Config';

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
        // Check if user is owner
        const isOwner = await readContract(wagmiConfig, {
          address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
          abi: [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "addr",
                  "type": "address"
                }
              ],
              "name": "isOwner",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ],
          functionName: 'isOwner',
          args: [address]
        });

        if (isOwner) {
          setUserRole(UserRole.Owner);
          setIsLoading(false);
          return;
        }

        // Check if user is approved verifier
        const isVerifier = await readContract(wagmiConfig, {
          address: MEDICAL_VERIFIER_CONTRACT.address as `0x${string}`,
          abi: [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "addr",
                  "type": "address"
                }
              ],
              "name": "isApprovedVerifier",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ],
          functionName: 'isApprovedVerifier',
          args: [address]
        });

        setUserRole(isVerifier ? UserRole.Verifier : UserRole.Default);
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
