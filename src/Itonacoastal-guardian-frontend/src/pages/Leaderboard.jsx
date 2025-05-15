import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
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

const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Section = styled.div`
  flex: 1;
  background: rgba(17, 24, 39, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 1.5rem;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(4px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
  }
`;

const LeaderboardContainer = styled.div`
  margin-bottom: 2rem;
`;

const LeaderboardTitle = styled.h2`
  font-size: 1.8rem;
  color: #a855f7;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  background: ${props => (props.isTop ? 'linear-gradient(to right, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))' : 'rgba(17, 24, 39, 0.8)')};
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  color: ${props => (props.isTop ? '#fff' : '#d1d5db')};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  }

  span {
    font-size: 1.1rem;
    text-shadow: ${props => (props.isTop ? '0 0 5px rgba(168, 85, 247, 0.7)' : 'none')};
  }
`;

function Leaderboard({ title, items }) {
  return (
    <LeaderboardContainer>
      <LeaderboardTitle>{title}</LeaderboardTitle>
      {items.map((item, index) => (
        <LeaderboardItem key={item.id || item.name} isTop={index === 0}>
          <span>
            {index + 1}. {item.name}
          </span>
          <span>
            {item.tokens} Tokens {item.level && `(${item.level})`}
          </span>
        </LeaderboardItem>
      ))}
    </LeaderboardContainer>
  );
}

function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Mock API call for user leaderboard data
    const userData = [
      { id: 1, name: 'John Doe', tokens: 250, level: 'Master Collector' },
      { id: 2, name: 'Jane Smith', tokens: 180, level: 'NFT Pioneer' },
      { id: 3, name: 'Alex Brown', tokens: 120, level: 'Eco-Collector' },
      { id: 4, name: 'Chris Green', tokens: 90, level: 'Novice Miner' },
    ].sort((a, b) => b.tokens - a.tokens);

    // Mock API call for team leaderboard data
    const teamData = [
      { name: 'NFT Alpha Crew', tokens: 540 },
      { name: 'Eco-Beta Squad', tokens: 480 },
      { name: 'Digital Gamma Clan', tokens: 300 },
      { name: 'Neon Delta Tribe', tokens: 150 },
    ].sort((a, b) => b.tokens - a.tokens);

    setUsers(userData);
    setTeams(teamData);
  }, []);

  return (
    <Container>
      <Title>NFT Global Leaderboards</Title>
      <SectionWrapper>
        <Section>
          <Leaderboard title="Top NFT Collectors" items={users} />
        </Section>
        <Section>
          <Leaderboard title="Top NFT Crews" items={teams} />
        </Section>
      </SectionWrapper>
    </Container>
  );
}

export default LeaderboardPage;
