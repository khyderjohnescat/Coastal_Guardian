import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventCalendar from '../components/EventCalendar';
import GamifiedMap from '../components/Map';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const SplitContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 2rem;
`;

const EventListSection = styled.div`
  flex: 0 0 40%; // 40% width for the event list
  max-height: 500px;
  overflow-y: auto; // Scrollable if the list is long
`;

const MapSection = styled.div`
  flex: 0 0 60%; // 60% width for the map
`;

function Events() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        // Mock API call for events with location data (latitude, longitude)
        setEvents([
            { id: 1, title: 'Coastal Clean-Up', date: '2025-05-20', points: 10, lat: 16.0433, lng: 120.3333 }, // Dagupan City
            { id: 2, title: 'Mangrove Planting', date: '2025-05-25', points: 50, lat: 16.0833, lng: 120.4167 }, // Lingayen
            { id: 3, title: 'Tree Planting Drive', date: '2025-06-01', points: 30, lat: 15.9667, lng: 120.4000 }, // San Carlos City
            { id: 4, title: 'River Restoration', date: '2025-06-05', points: 20, lat: 16.1167, lng: 120.6167 }, // Alaminos City
            { id: 5, title: 'Community Recycling Workshop', date: '2025-06-10', points: 15, lat: 15.8833, lng: 120.2833 }, // Urdaneta City
            { id: 6, title: 'Beach Conservation Talk', date: '2025-06-15', points: 25, lat: 16.0167, lng: 120.2333 }, // Bolinao
            { id: 7, title: 'Coral Reef Restoration', date: '2025-06-20', points: 40, lat: 16.1167, lng: 120.6167 }, // Alaminos City (Hundred Islands)
            { id: 8, title: 'Coastal Erosion Awareness Walk', date: '2025-06-25', points: 15, lat: 16.0833, lng: 120.4167 }, // Lingayen Gulf
            { id: 9, title: 'Marine Biodiversity Seminar', date: '2025-06-30', points: 20, lat: 16.0167, lng: 120.2333 }, // Bolinao
            { id: 10, title: 'Seagrass Bed Cleanup', date: '2025-07-05', points: 30, lat: 16.3167, lng: 119.9667 }, // Anda
        ]);
    }, []);

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
    };

    return (
        <Container>
            <h1>Upcoming Events</h1>
            <SplitContainer>
                <EventListSection>
                    <h2>Event List</h2>
                    <EventCalendar events={events} onEventSelect={handleEventSelect} />
                </EventListSection>
                <MapSection>
                    <h2 class>Event Map</h2>
                    <GamifiedMap events={events} selectedEvent={selectedEvent} />
                </MapSection>
            </SplitContainer>
        </Container>
    );
}

export default Events;