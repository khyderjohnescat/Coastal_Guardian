import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const MainContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  min-width: 600px; /* Prevent container from being too small */
  max-width: 1600px; /* Increased for larger displays */
  padding: 3rem;
  background: linear-gradient(135deg, rgba(59, 7, 100, 0.9), rgba(30, 58, 138, 0.9), rgba(0, 0, 0, 0.9));
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  border: 2px solid #a855f7; /* Purple for NFT vibe */
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

function Rewards() {
  const [rewards, setRewards] = useState([]);

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

  return (
    <MainContainer>
      <Container>
        <Title>NFT Reward Marketplace</Title>
        {rewards.map((reward) => (
          <RewardItem key={reward.id}>
            <h4>{reward.name}</h4>
            <p>Tokens Required: {reward.tokensRequired}</p>
            <RedeemButton>Redeem</RedeemButton>
          </RewardItem>
        ))}
      </Container>
    </MainContainer>
  );
}

export default Rewards;
