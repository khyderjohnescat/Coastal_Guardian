import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const DashboardContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  min-width: 600px; /* Prevent container from being too small */
  max-width: 1600px; /* Increased for larger displays */
  padding: 3rem;
  background: linear-gradient(135deg, rgba(59, 7, 100, 0.9), rgba(30, 58, 138, 0.9), rgba(0, 0, 0, 0.9));
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  border: 2px solid #a855f7; /* Purple border for NFT vibe */
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

const DashboardTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.7);
  margin-bottom: 2rem;
  background: linear-gradient(to right, #a855f7, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Widget = styled.div`
  background: rgba(17, 24, 39, 0.8); /* Dark, semi-transparent */
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(168, 85, 247, 0.5);
  }
`;

const WidgetTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.8rem;
  color: #fff;
  border-bottom: 2px solid #a855f7;
  padding-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
`;

const WidgetContent = styled.div`
  font-size: 1.1rem;
  color: #d1d5db;
  line-height: 1.6;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0.5rem 0;
  }
`;

const Highlight = styled.span`
  color: #ec4899; /* Pink for NFT accent */
  font-weight: bold;
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardTitle>NFT Vault Dashboard</DashboardTitle>
      <WidgetsGrid>
        <Widget>
          <WidgetTitle>Welcome to Your Vault</WidgetTitle>
          <WidgetContent>
            Your central hub for managing <Highlight>NFT collections</Highlight>, <Highlight>minting events</Highlight>, and <Highlight>rewards</Highlight>.
          </WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>Upcoming Minting Events</WidgetTitle>
          <WidgetContent>
            <ul>
              <li>Rare Coastal NFT Drop - <Highlight>May 20, 2025</Highlight></li>
              <li>Digital Art Auction - <Highlight>May 25, 2025</Highlight></li>
            </ul>
          </WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>Your NFT Stats</WidgetTitle>
          <WidgetContent>
            <p>NFTs Owned: <Highlight>12</Highlight></p>
            <p>Marketplace Rank: <Highlight>#5</Highlight></p>
          </WidgetContent>
        </Widget>
      </WidgetsGrid>
    </DashboardContainer>
  );
}

export default Dashboard;