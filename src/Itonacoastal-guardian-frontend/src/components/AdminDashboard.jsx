import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import EventForm from './EventForm';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const DashboardContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  min-width: 600px;
  max-width: 1600px;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(59, 7, 100, 0.9), rgba(30, 58, 138, 0.9), rgba(0, 0, 0, 0.9));
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  border: 2px solid #a855f7;
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

const Title = styled.h2`
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

const AddButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #a855f7, #ec4899);
  color: #fff;
  font-family: 'Orbitron', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
  }
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

const EventItem = styled.li`
  background: rgba(17, 24, 39, 0.8);
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.5);
  }
`;

const EventDetails = styled.div`
  flex: 1;
`;

const EventTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 500;
  color: #a855f7;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
  margin: 0 0 0.5rem 0;
`;

const EventInfo = styled.p`
  font-size: 1.1rem;
  color: #d1d5db;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: linear-gradient(to right, #a855f7, #ec4899);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: #fff;
  font-family: 'Orbitron', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.7);
  }

  &:active {
    transform: scale(0.95);
  }
`;

function AdminDashboard() {
  const [events, setEvents] = useState([
    { id: 1, title: 'NFT Coastal Drop', date: '2025-05-20', tokens: 10 },
    { id: 2, title: 'Digital Mangrove Mint', date: '2025-05-25', tokens: 50 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now(), tokens: newEvent.points }]);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <DashboardContainer>
      <Title>NFT Event Management Dashboard</Title>
      <AddButton onClick={() => setIsModalOpen(true)}>Add New Event</AddButton>
      <EventForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
      <EventList>
        {events.map((event) => (
          <EventItem key={event.id}>
            <EventDetails>
              <EventTitle>{event.title}</EventTitle>
              <EventInfo>Date: {event.date} | Reward Tokens: {event.tokens}</EventInfo>
            </EventDetails>
            <DeleteButton onClick={() => handleDeleteEvent(event.id)}>Remove</DeleteButton>
          </EventItem>
        ))}
      </EventList>
    </DashboardContainer>
  );
}

export default AdminDashboard;