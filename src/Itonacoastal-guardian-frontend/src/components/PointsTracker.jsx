import React from 'react';
import styled from 'styled-components';

const PointsCard = styled.div`
  background: #3498db;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

function PointsTracker({ points }) {
  return (
    <PointsCard>
      <h3>Your Points</h3>
      <p>{points} Points</p>
    </PointsCard>
  );
}

export default PointsTracker;