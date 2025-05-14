import React from 'react';
import styled from 'styled-components';

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  background: #ecf0f1;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
`;

function EventCalendar({ events, onEventSelect }) {
  return (
    <EventList>
      {events.map((event) => (
        <EventItem key={event.id}>
          <h4>{event.title}</h4>
          <p>Date: {event.date}</p>
          <p>Points: {event.points}</p>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => onEventSelect(event)}
          >
            Join Event
          </button>
        </EventItem>
      ))}
    </EventList>
  );
}

export default EventCalendar;