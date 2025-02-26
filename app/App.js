"use client";

import { useEffect, useState } from "react";
import '@rainbow-me/rainbowkit/styles.css'; // Import RainbowKit styles
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';

// Importing additional chains
import { polygon, mainnet, optimism, arbitrum, bsc } from 'wagmi/chains';

const App = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const rainbowConfig = getDefaultConfig({
      appName: 'LittleBaoTinkers',
      projectId: '08de32a19b392b8abbc7ad0eef0fe4ca', // Replace with your actual WalletConnect ID
      chains: [mainnet, polygon, optimism, arbitrum, bsc], // Added more chains
      ssr: true,
    });
    setConfig(rainbowConfig);
  }, []);

  if (!config) return null; // Wait until config is loaded

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#72afd9', 
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
          chains={config.chains}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
