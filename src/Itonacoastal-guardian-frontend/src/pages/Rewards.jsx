import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin: 2rem ;
  max-width: 1200px;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%);
  border: 2px solid #00ffff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  font-family: 'Orbitron', sans-serif;
  color: #e0e0e0;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1rem;
  }
`;

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const RewardItem = styled.div`
  background:rgb(13, 164, 201);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
`;

function Rewards() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // Mock API call for rewards
    setRewards([
      { id: 1, name: 'Coastal Guardian NFT', pointsRequired: 100 },
      { id: 2, name: 'Eco-Merchandise', pointsRequired: 50 },
    ]);
  }, []);

  return (
    <MainContainer>
    <Container>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Reward Marketplace</h1>
      {rewards.map((reward) => (
        <RewardItem key={reward.id}>
          <h4>{reward.name}</h4>
          <p>Points Required: {reward.pointsRequired}</p>
          <button>Redeem</button>
        </RewardItem>
      ))}
    </Container>
    </MainContainer>

  );
}

export default Rewards;