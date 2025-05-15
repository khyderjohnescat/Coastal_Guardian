import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import EventCalendar from '../components/EventCalendar';
import GamifiedMap from '../components/Map';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  padding: 3rem 2rem;
  min-height: 100vh;
  width: 100%;
  min-width: 600px; /* Prevent container from being too small */
  max-width: 1600px; /* Increased for larger displays */
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(59, 7, 100, 0.9), rgba(30, 58, 138, 0.9), rgba(0, 0, 0, 0.9));
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  border: 2px solid #a855f7; /* Purple for NFT vibe */
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
  backdrop-filter: blur(6px);
  font-family: 'Orbitron', 'Arial', sans-serif;
  color: #e0e0e0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
  }

  @media (max-width: 1024px) {
    min-width: 400px;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 768px) {
    min-width: 300px;
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.h1`
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

const SplitContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const EventListSection = styled.div`
  flex: 0 0 35%;
  background: rgba(17, 24, 39, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(4px);
  padding: 2rem;
  max-height: 650px;
  overflow-y: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
  }

  @media (max-width: 1024px) {
    flex: 1;
    max-height: none;
    padding: 1.5rem;
  }
`;

const MapSection = styled.div`
  flex: 0 0 65%;
  background: rgba(17, 24, 39, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(4px);
  padding: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
  }

  @media (max-width: 1024px) {
    flex: 1;
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  color: #a855f7;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
  margin-bottom: 1.5rem;
`;

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setEvents([
      { id: 1, title: 'NFT Coastal Drop', date: '2025-05-20', points: 10, lat: 16.0433, lng: 120.3333 },
      { id: 2, title: 'Digital Mangrove Mint', date: '2025-05-25', points: 50, lat: 16.0833, lng: 120.4167 },
      { id: 3, title: 'Eco-NFT Tree Planting', date: '2025-06-01', points: 30, lat: 15.9667, lng: 120.4000 },
      { id: 4, title: 'River NFT Restoration', date: '2025-06-05', points: 20, lat: 16.1167, lng: 120.6167 },
      { id: 5, title: 'Recycling NFT Workshop', date: '2025-06-10', points: 15, lat: 15.8833, lng: 120.2833 },
      { id: 6, title: 'Beach NFT Talk', date: '2025-06-15', points: 25, lat: 16.0167, lng: 120.2333 },
      { id: 7, title: 'Coral Reef NFT Mint', date: '2025-06-20', points: 40, lat: 16.1167, lng: 120.6167 },
      { id: 8, title: 'Coastal NFT Walk', date: '2025-06-25', points: 15, lat: 16.0833, lng: 120.4167 },
      { id: 9, title: 'Marine NFT Seminar', date: '2025-06-30', points: 20, lat: 16.0167, lng: 120.2333 },
      { id: 10, title: 'Seagrass NFT Cleanup', date: '2025-07-05', points: 30, lat: 16.3167, lng: 119.9667 },
      { id: 11, title: 'Daguoan NFT Clean-Up', date: '2025-07-10', points: 25, lat: 16.0583, lng: 120.3017 },
    ]);
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Container>
      <Header>Upcoming NFT Environmental Events</Header>
      <SplitContainer>
        <EventListSection>
          <SectionTitle>NFT Event Schedule</SectionTitle>
          <EventCalendar events={events} onEventSelect={handleEventSelect} />
        </EventListSection>
        <MapSection>
          <SectionTitle>NFT Event Locations</SectionTitle>
          <GamifiedMap events={events} selectedEvent={selectedEvent} />
        </MapSection>
      </SplitContainer>
    </Container>
  );
}

export default Events;
