import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Leaderboard from '../components/Leaderboard';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const Section = styled.div`
  flex: 1;
`;

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
      <h1>Global Leaderboards</h1>
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