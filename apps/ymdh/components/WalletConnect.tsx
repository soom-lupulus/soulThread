'use client'
import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const WalletConnect = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const config = getDefaultConfig({
        appName: 'My RainbowKit App',
        projectId: 'f45d81cd23fc215845198ce6f58e0f6d',
        chains: [mainnet, polygon, optimism, arbitrum, base],
        ssr: false, // If your dApp uses server side rendering (SSR)
    });
    const queryClient = new QueryClient();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default WalletConnect