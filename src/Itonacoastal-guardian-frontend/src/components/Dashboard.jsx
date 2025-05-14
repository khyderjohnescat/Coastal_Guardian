import React from 'react';
import styled from 'styled-components';

// Styled components for Dashboard
const DashboardContainer = styled.div`
  margin: 2rem auto;
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

const UserInfo = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  h2 {
    font-size: 2rem;
    color: #00ffff;
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: 1.2rem;
    color: #ff00ff;
    text-shadow: 0 0 5px rgba(255, 0, 255, 0.5);
  }
`;

// PointsTracker component (assumed placeholder)
const PointsTrackerContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  border: 2px solid #ff00ff;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 25px rgba(255, 0, 255, 0.5);
  }

  h3 {
    font-size: 1.5rem;
    color: #00ffff;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .points {
    font-size: 2rem;
    color: #ff00ff;
    font-weight: 700;
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const PointsTracker = ({ points }) => (
  <PointsTrackerContainer>
    <h3>Your Points</h3>
    <div className="points">{points.toLocaleString()} PTS</div>
  </PointsTrackerContainer>
);

// NFTDisplay component (assumed placeholder)
const NFTDisplayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  border: 2px solid #00ffff;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
`;

const NFTCard = styled.div`
  background: linear-gradient(135deg, #2c2c54 0%, #1c2526 100%);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #00ffff;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.3);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 2px solid #ff00ff;
  }

  .nft-info {
    padding: 1rem;
    text-align: center;
  }

  h4 {
    font-size: 1.1rem;
    color: #00ffff;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  p {
    font-size: 0.9rem;
    color: #e0e0e0;
  }
`;

const NFTDisplay = ({ nfts }) => (
  <NFTDisplayContainer>
    {nfts.map((nft) => (
      <NFTCard key={nft.id}>
        <img src={nft.imageUrl} alt={nft.name} />
        <div className="nft-info">
          <h4>{nft.name}</h4>
          <p>Token #{nft.tokenId}</p>
        </div>
      </NFTCard>
    ))}
  </NFTDisplayContainer>
);

function Dashboard({ user }) {
  return (
    <DashboardContainer>
      <UserInfo>
        <h2>{user.name}</h2>
        <p>Level: {user.level}</p>
      </UserInfo>
      <PointsTracker points={user.points} />
      <NFTDisplay nfts={user.nfts} />
    </DashboardContainer>
  );
}

export default Dashboard;