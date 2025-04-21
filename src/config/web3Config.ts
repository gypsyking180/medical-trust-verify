
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';

// Configure chains & providers
const projectId = 'careBridge-medical-crowdfunding';

// Configure rainbow kit
const { connectors } = getDefaultWallets({
  appName: 'careBridge',
  projectId: projectId,
});

// Create wagmi config
export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  },
  connectors
});

// Export chains for RainbowKit
export const chains = [sepolia];
