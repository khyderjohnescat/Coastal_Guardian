import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Keyframe for pulse animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const DashboardContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  min-width: 800px; /* Prevent container from being too small */
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

const UserInfo = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
  padding: 2rem;
  background: rgba(17, 24, 39, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(4px);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
  }

  h2 {
    font-size: 2.2rem;
    color: transparent;
    background: linear-gradient(to right, #a855f7, #ec4899);
    -webkit-background-clip: text;
    background-clip: text;
    text-shadow: 0 0 10px rgba(168, 85, 247, 0.7);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: 1.3rem;
    color: #ec4899;
    text-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
  }
`;

const PointsTrackerContainer = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(17, 24, 39, 0.8);
  border-radius: 12px;
  border: 2px solid #ec4899;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
  }

  h3 {
    font-size: 1.8rem;
    color: #a855f7;
    text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .points {
    font-size: 2.5rem;
    color: #ec4899;
    font-weight: 700;
    animation: ${pulse} 2s infinite ease-in-out;
    text-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
  }
`;

const PointsTracker = ({ points }) => (
  <PointsTrackerContainer>
    <h3>Your Tokens</h3>
    <div className="points">{points.toLocaleString()} TOKENS</div>
  </PointsTrackerContainer>
);

const NFTDisplayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: rgba(17, 24, 39, 0.8);
  border-radius: 12px;
  border: 2px solid #a855f7;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(4px);
`;

const NFTCard = styled.div`
  background: linear-gradient(135deg, rgba(44, 44, 84, 0.9), rgba(28, 37, 38, 0.9));
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #a855f7;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.5), 0 0 35px rgba(236, 72, 153, 0.3);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-bottom: 2px solid #ec4899;
  }

  .nft-info {
    padding: 1.2rem;
    text-align: center;
  }

  h4 {
    font-size: 1.2rem;
    color: #a855f7;
    text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1rem;
    color: #d1d5db;
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
  // Fallback user data if none provided
  const defaultUser = {
    name: 'NFT Collector',
    level: 'Pro',
    points: 1500,
    nfts: [
      { id: 1, name: 'Coastal Gem', tokenId: '001', imageUrl: 'https://via.placeholder.com/220x220.png?text=NFT+1' },
      { id: 2, name: 'Digital Wave', tokenId: '002', imageUrl: 'https://via.placeholder.com/220x220.png?text=NFT+2' },
      { id: 3, name: 'Neon Reef', tokenId: '003', imageUrl: 'https://via.placeholder.com/220x220.png?text=NFT+3' },
    ],
  };

  const { name, level, points, nfts } = user || defaultUser;

  return (
    <DashboardContainer>
      <UserInfo>
        <h2>{name}</h2>
        <p>Collector Level: {level}</p>
      </UserInfo>
      <PointsTracker points={points} />
      <NFTDisplay nfts={nfts} />
    </DashboardContainer>
  );
}

export default Dashboard;