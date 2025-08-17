import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { mainnet, sepolia } from 'viem/chains';
// ...existing code...
import App from "./App";
import "./styles/index.css";
import { networkConfig } from "./config";

const qc = new QueryClient();

// ...existing code...

// wagmi / rainbowkit setup (using RainbowKit helper for this repo's versions)
// NOTE: replace projectId with your WalletConnect v2 project id for full functionality
const wagmiConfig = getDefaultConfig({ chains: [mainnet, sepolia], appName: 'SoulHub', projectId: "595678033527d68a0a2a868baef4a826" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <WagmiProvider config={wagmiConfig as any}>
        <RainbowKitProvider>
          <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
            <WalletProvider autoConnect>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </WalletProvider>
          </SuiClientProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
