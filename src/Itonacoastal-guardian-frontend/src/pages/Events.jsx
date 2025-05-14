import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventCalendar from '../components/EventCalendar';
import GamifiedMap from '../components/Map';

const Container = styled.div`
  padding: 2rem 1.5rem;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const Header = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
`;

const SplitContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const EventListSection = styled.div`
  flex: 0 0 35%;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-height: 600px;
  overflow-y: auto;

  @media (max-width: 1024px) {
    flex: 1;
    max-height: none;
  }
`;

const MapSection = styled.div`
  flex: 0 0 65%;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  @media (max-width: 1024px) {
    flex: 1;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 1rem;
`;

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setEvents([
      { id: 1, title: 'Coastal Clean-Up', date: '2025-05-20', points: 10, lat: 16.0433, lng: 120.3333 },
      { id: 2, title: 'Mangrove Planting', date: '2025-05-25', points: 50, lat: 16.0833, lng: 120.4167 },
      { id: 3, title: 'Tree Planting Drive', date: '2025-06-01', points: 30, lat: 15.9667, lng: 120.4000 },
      { id: 4, title: 'River Restoration', date: '2025-06-05', points: 20, lat: 16.1167, lng: 120.6167 },
      { id: 5, title: 'Community Recycling Workshop', date: '2025-06-10', points: 15, lat: 15.8833, lng: 120.2833 },
      { id: 6, title: 'Beach Conservation Talk', date: '2025-06-15', points: 25, lat: 16.0167, lng: 120.2333 },
      { id: 7, title: 'Coral Reef Restoration', date: '2025-06-20', points: 40, lat: 16.1167, lng: 120.6167 },
      { id: 8, title: 'Coastal Erosion Awareness Walk', date: '2025-06-25', points: 15, lat: 16.0833, lng: 120.4167 },
      { id: 9, title: 'Marine Biodiversity Seminar', date: '2025-06-30', points: 20, lat: 16.0167, lng: 120.2333 },
      { id: 10, title: 'Seagrass Bed Cleanup', date: '2025-07-05', points: 30, lat: 16.3167, lng: 119.9667 },
      { id: 11, title: 'Daguoan Community Clean-Up', date: '2025-07-10', points: 25, lat: 16.0583, lng: 120.3017 },

    ]);
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Container>
      <Header>Upcoming Environmental Events</Header>
      <SplitContainer>
        <EventListSection>
          <SectionTitle>Event Schedule</SectionTitle>
          <EventCalendar events={events} onEventSelect={handleEventSelect} />
        </EventListSection>
        <MapSection>
          <SectionTitle>Event Locations</SectionTitle>
          <GamifiedMap events={events} selectedEvent={selectedEvent} />
        </MapSection>
      </SplitContainer>
    </Container>
  );
}

export default Events;