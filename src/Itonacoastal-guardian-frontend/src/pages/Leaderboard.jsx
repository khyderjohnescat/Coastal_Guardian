import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for LeaderboardPage
const Container = styled.div`
  margin: 2rem;
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

const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const Section = styled.div`
  flex: 1;
`;

// Leaderboard Component
const LeaderboardContainer = styled.div`
  margin-bottom: 2rem;
`;

const LeaderboardTitle = styled.h2`
  color: #e0e0e0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  color: ${({ isTop }) => (isTop ? '#fff' : '#e0e0e0')};
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
            {item.points} points {item.level && `(${item.level})`}
          </span>
        </LeaderboardItem>
      ))}
    </LeaderboardContainer>
  );
}

// LeaderboardPage Component
function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Mock API call for user leaderboard data
    const userData = [
      { id: 1, name: 'John Doe', points: 250, level: 'Champion' },
      { id: 2, name: 'Jane Smith', points: 180, level: 'Protector' },
      { id: 3, name: 'Alex Brown', points: 120, level: 'Novice' },
      { id: 4, name: 'Chris Green', points: 90, level: 'Apprentice' },
    ].sort((a, b) => b.points - a.points);

    // Mock API call for team leaderboard data
    const teamData = [
      { name: 'Team Alpha', points: 540 },
      { name: 'Team Beta', points: 480 },
      { name: 'Team Gamma', points: 300 },
      { name: 'Team Delta', points: 150 },
    ].sort((a, b) => b.points - a.points);

    setUsers(userData);
    setTeams(teamData);
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Global Leaderboards</h1>
      <SectionWrapper>
        <Section>
          <Leaderboard title="Top Players" items={users} />
        </Section>
        <Section>
          <Leaderboard title="Top Teams" items={teams} />
        </Section>
      </SectionWrapper>
    </Container>
  );
}

export default LeaderboardPage;