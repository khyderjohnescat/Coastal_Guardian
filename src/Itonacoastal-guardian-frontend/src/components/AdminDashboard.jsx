import React, { useState } from 'react';
import styled from 'styled-components';
import EventForm from './EventForm';

const DashboardContainer = styled.div`
  margin: 2rem 0;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  background: #ecf0f1;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
`;

function AdminDashboard() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Coastal Clean-Up', date: '2025-05-20', points: 10 },
    { id: 2, title: 'Mangrove Planting', date: '2025-05-25', points: 50 },
  ]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <DashboardContainer>
      <h2>Manage Events</h2>
      <EventForm onAddEvent={handleAddEvent} />
      <EventList>
        {events.map((event) => (
          <EventItem key={event.id}>
            <div>
              <h4>{event.title}</h4>
              <p>Date: {event.date} | Points: {event.points}</p>
            </div>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </EventItem>
        ))}
      </EventList>
    </DashboardContainer>
  );
}

export default AdminDashboard;