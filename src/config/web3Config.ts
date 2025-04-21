
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { sepolia } from 'wagmi/chains';

// Configure chains
const { chains, publicClient } = configureChains(
  [sepolia],
  [
    publicProvider()
  ]
);

// Configure rainbow kit
const { connectors } = getDefaultWallets({
  appName: 'careBridge',
  projectId: 'careBridge-medical-crowdfunding',
  chains
});

// Create wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

export { chains };
