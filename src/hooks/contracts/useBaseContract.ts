
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { useToast } from "@/hooks/use-toast";

export const useBaseContract = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();

  return {
    address,
    publicClient,
    walletClient,
    toast,
  };
};
