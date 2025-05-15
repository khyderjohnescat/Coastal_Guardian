import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ethers } from 'ethers';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const MainContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  min-width: 600px;
  max-width: 1600px;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(59, 7, 100, 0.9), rgba(30, 58, 138, 0.9), rgba(0, 0, 0, 0.9));
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  border: 2px solid #a855f7;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
  backdrop-filter: blur(6px);
  position: relative;
  overflow: hidden;
  font-family: 'Orbitron', 'Arial', sans-serif;
  color: #e0e0e0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
  }

  @media (max-width: 1024px) {
    min-width: 400px;
    padding: 2rem;
    margin: 1.5rem auto;
  }

  @media (max-width: 768px) {
    min-width: 300px;
    padding: 1.5rem;
    margin: 1rem auto;
  }
`;

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: transparent;
  background: linear-gradient(to right, #a855f7, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.7);
  text-align: center;
  margin-bottom: 2.5rem;
`;

const RewardItem = styled.div`
  background: rgba(17, 24, 39, 0.8);
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(4px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.5);
  }

  h4 {
    font-size: 1.8rem;
    color: #a855f7;
    text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #d1d5db;
    margin-bottom: 1rem;
  }
`;

const RedeemButton = styled.button`
  background: linear-gradient(to right, #a855f7, #ec4899);
  color: #fff;
  font-family: 'Orbitron', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.7);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const WalletButton = styled(RedeemButton)`
  margin-bottom: 1rem;
`;

const DisconnectButton = styled(RedeemButton)`
  background: linear-gradient(to right, #ec4899, #a855f7);
  margin-bottom: 1rem;
`;

const WalletInfo = styled.p`
  font-size: 1rem;
  color: #a855f7;
  margin-bottom: 1.5rem;
  word-break: break-all;
`;

const ErrorLink = styled.a`
  color: #ec4899;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #f472b6;
  }
`;

function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call for rewards
    setRewards([
      { id: 1, name: 'Coastal Guardian NFT', tokensRequired: 100 },
      { id: 2, name: 'Digital Eco-Badge', tokensRequired: 50 },
      { id: 3, name: 'Neon Reef NFT', tokensRequired: 150 },
      { id: 4, name: 'Eco-Warrior Avatar', tokensRequired: 75 },
      { id: 5, name: 'Rare Mangrove NFT', tokensRequired: 200 },
    ]);
  }, []);

  const suggestMetaMaskDownload = () => {
    setError(
      <>
        MetaMask is not installed. Please{' '}
        <ErrorLink href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
          download MetaMask
        </ErrorLink>{' '}
        to continue.
      </>
    );
  };

  const disconnectMetaMask = () => {
    // Clear account and error states
    setAccount(null);
    setError(null);

    // Remove event listeners
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
  };

  const connectMetaMask = async () => {
    try {
      // Check for MetaMask specifically
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        suggestMetaMaskDownload();
        return;
      }

      // Request accounts
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (accounts.length > 0) {
        // Verify network (e.g., Ethereum Mainnet chainId: 1)
        const network = await provider.getNetwork();
        const chainId = network.chainId;
        if (chainId !== 1n) { // Using BigInt for chainId
          setError('Please switch to Ethereum Mainnet in MetaMask.');
          return;
        }

        setAccount(accounts[0]);
        setError(null);

        // Set up listeners for account and chain changes
        window.ethereum.on('accountsChanged', (newAccounts) => {
          if (newAccounts.length > 0) {
            setAccount(newAccounts[0]);
            setError(null);
          } else {
            disconnectMetaMask();
          }
        });

        window.ethereum.on('chainChanged', () => {
          window.location.reload(); // Reload to handle network change
        });
      } else {
        setError('No accounts found. Please unlock MetaMask.');
      }
    } catch (err) {
      if (err.code === 4001) {
        setError('Connection rejected. Please approve the connection in MetaMask.');
      } else {
        setError('Failed to connect to MetaMask. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <MainContainer>
      <Container>
        <Title>NFT Reward Marketplace</Title>
        {!account ? (
          <WalletButton onClick={connectMetaMask}>Connect MetaMask</WalletButton>
        ) : (
          <DisconnectButton onClick={disconnectMetaMask}>Disconnect</DisconnectButton>
        )}
        {account && <WalletInfo>Connected: {account}</WalletInfo>}
        {error && <WalletInfo style={{ color: '#ec4899' }}>{error}</WalletInfo>}
        {rewards.map((reward) => (
          <RewardItem key={reward.id}>
            <h4>{reward.name}</h4>
            <p>Tokens Required: {reward.tokensRequired}</p>
            <RedeemButton disabled={!account}>Redeem</RedeemButton>
          </RewardItem>
        ))}
      </Container>
    </MainContainer>
  );
}

export default Rewards;