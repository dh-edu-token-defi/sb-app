import { Button } from '@daohaus/ui';
import React from 'react';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface AddToMetaMaskButtonProps {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenImage: string;
}

const AddToMetaMaskButton: React.FC<AddToMetaMaskButtonProps> = ({ tokenAddress, tokenSymbol, tokenDecimals, tokenImage }) => {
  const addTokenToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        });

        if (wasAdded) {
          console.log('Token added to MetaMask');
        } else {
          console.log('Token not added');
        }
      } catch (error) {
        console.error('Error adding token to MetaMask', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  return (
    <Button size="lg"
    style={{ marginTop: "2rem" }}
    variant="outline"
    onClick={addTokenToMetaMask}
    >
      Add {tokenSymbol} to Wallet
    </Button>
  );
};

export default AddToMetaMaskButton;