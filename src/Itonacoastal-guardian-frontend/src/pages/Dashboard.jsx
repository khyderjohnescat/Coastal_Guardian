import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
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

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Widget = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const WidgetTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
`;

const WidgetContent = styled.div`
  font-size: 1rem;
  color: #555;
`;

const Highlight = styled.span`
  color: #007bff;
  font-weight: bold;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Dashboard</h1>
      <WidgetsGrid>
        <Widget>
          <WidgetTitle>Welcome to the Dashboard</WidgetTitle>
          <WidgetContent>
            This is your central hub for managing <Highlight>events</Highlight>, <Highlight>rewards</Highlight>, and more.
          </WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>Upcoming Events</WidgetTitle>
          <WidgetContent>
            <ul>
              <li>Mangrove Planting - <Highlight>May 20, 2025</Highlight></li>
              <li>Beach Cleanup - <Highlight>May 25, 2025</Highlight></li>
            </ul>
          </WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>Your Progress</WidgetTitle>
          <WidgetContent>
            <p>Points Earned: <Highlight>1200</Highlight></p>
            <p>Rank: <Highlight>#5</Highlight> on the Leaderboard</p>
          </WidgetContent>
        </Widget>
      </WidgetsGrid>
    </DashboardContainer>
  );
}

export default Dashboard;