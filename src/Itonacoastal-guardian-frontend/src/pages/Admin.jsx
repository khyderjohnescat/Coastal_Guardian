import React from 'react';
import styled from 'styled-components';
import AdminDashboard from '../components/AdminDashboard';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

function Admin() {
  // Mock admin authentication (replace with real auth logic)
  const isAdmin = true; // Assume user is admin for now

  return (
    <Container>
      {isAdmin ? <AdminDashboard /> : <p>Access Denied. Contact an administrator.</p>}
    </Container>
  );
}

export default Admin;