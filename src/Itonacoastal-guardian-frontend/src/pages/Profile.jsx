import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
  width: 100%;
  max-width: 1900px;
`;

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock API call for user data
    setUser({
      name: 'John Doe',
      points: 150,
      level: 'Protector',
      nfts: [
        { id: 1, name: 'Coastal Guardian #1', image: 'nft1.png' },
        { id: 2, name: 'Mangrove Protector', image: 'nft2.png' },
      ],
    });
  }, []);

  return (
    <Container>
      {user ? (
        <Dashboard user={user} />
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default Profile;