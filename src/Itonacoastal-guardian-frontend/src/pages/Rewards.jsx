import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const RewardItem = styled.div`
  background: #ecf0f1;
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
    <Container>
      <h1>Reward Marketplace</h1>
      {rewards.map((reward) => (
        <RewardItem key={reward.id}>
          <h4>{reward.name}</h4>
          <p>Points Required: {reward.pointsRequired}</p>
          <button>Redeem</button>
        </RewardItem>
      ))}
    </Container>
  );
}

export default Rewards;