import React, { useState } from 'react';
import styled from 'styled-components';
import EventForm from './EventForm';

const DashboardContainer = styled.div`
  margin: 2rem auto;
  max-width: 1200px;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  color: #333333;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
`;

const EventItem = styled.li`
  background: #f9f9f9;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
`;

const EventDetails = styled.div`
  flex: 1;
`;

const EventTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333333;
  margin: 0 0 0.3rem 0;
`;

const EventInfo = styled.p`
  font-size: 0.9rem;
  color: #555555;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: #d32f2f;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: #b71c1c;
  }
`;

function AdminDashboard() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Coastal Conservation Initiative', date: '2025-05-20', points: 10 },
    { id: 2, title: 'Mangrove Restoration Project', date: '2025-05-25', points: 50 },
  ]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <DashboardContainer>
      <Title>Event Management Dashboard</Title>
      <EventForm onAddEvent={handleAddEvent} />
      <EventList>
        {events.map((event) => (
          <EventItem key={event.id}>
            <EventDetails>
              <EventTitle>{event.title}</EventTitle>
              <EventInfo>Date: {event.date} | Reward Points: {event.points}</EventInfo>
            </EventDetails>
            <DeleteButton onClick={() => handleDeleteEvent(event.id)}>Remove</DeleteButton>
          </EventItem>
        ))}
      </EventList>
    </DashboardContainer>
  );
}

export default AdminDashboard;