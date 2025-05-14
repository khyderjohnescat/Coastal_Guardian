import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from 'styled-components';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getIconSize = (eventTitle) => {
  return eventTitle === 'Mangrove Planting' ? [30, 30] : [24, 24];
};

const createPulsatingIcon = (eventTitle) => {
  const size = getIconSize(eventTitle);
  return L.divIcon({
    html: `<div class="pulsating-icon" style="width: ${size[0]}px; height: ${size[1]}px;"></div>`,
    className: '',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });
};

// User location icon
const createUserIcon = () => {
  return L.divIcon({
    html: `<div class="user-icon" style="width: 28px; height: 28px;"></div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

const GamifiedMapContainer = styled.div`
  position: relative;
  background: url('https://www.transparenttextures.com/patterns/parchment.png');
  border: 2px solid #8B4513;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(139, 69, 19, 0.5);
`;



function ProgressCircle({ lat, lng, progress, points, baseRadius = 50, scaleFactor = 10, maxRadius = 500 }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const pointsFactor = points / 50;
    let calculatedRadius = baseRadius + (progress * scaleFactor) + (baseRadius * pointsFactor * 0.5);
    calculatedRadius = Math.min(calculatedRadius, maxRadius);

    const circle = L.circle([lat, lng], {
      color: '#00ff00',
      fillColor: '#00ff00',
      fillOpacity: 0.3,
      radius: calculatedRadius,
    }).addTo(map);

    return () => {
      circle.remove();
    };
  }, [map, lat, lng, progress, points, baseRadius, scaleFactor, maxRadius]);

  return null;
}

function MapController({ selectedEvent, userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEvent && map) {
      map.flyTo([selectedEvent.lat, selectedEvent.lng], 13, {
        animate: true,
        duration: 1.5,
      });
    } else if (userLocation && map) {
      map.flyTo([userLocation.lat, userLocation.lng], 13, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [selectedEvent, userLocation, map]);

  return null;
}

function GamifiedMap({ events, selectedEvent }) {
  const [userProgress, setUserProgress] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Pangasinan bounds
  const pangasinanBounds = L.latLngBounds(
    [15.7, 119.7], // Southwest corner
    [16.4, 120.7]  // Northeast corner
  );

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Check if location is within Pangasinan bounds
          if (
            latitude >= 15.7 &&
            latitude <= 16.4 &&
            longitude >= 119.7 &&
            longitude <= 120.7
          ) {
            setUserLocation({ lat: latitude, lng: longitude });
            setLocationError(null);
          } else {
            setLocationError('Your location is outside Pangasinan.');
          }
        },
        (error) => {
          setLocationError('Unable to retrieve location: ' + error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    const progress = events.reduce((acc, event) => ({
      ...acc,
      [event.id]: Math.random() * 100,
    }), {});
    setUserProgress(progress);
  }, [events]);

  return (
    <GamifiedMapContainer>
      <style>{`
        .pulsating-icon {
          background: url('https://cdn-icons-png.flaticon.com/512/2952/2952948.png') no-repeat center;
          background-size: contain;
          position: relative;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .user-icon {
          background: url('https://cdn-icons-png.flaticon.com/512/1673/1673221.png') no-repeat center;
          background-size: contain;
          position: relative;
          border-radius: 50%;
          border: 2px solid #007bff;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <MapContainer
        center={[16.0433, 120.3333]}
        zoom={10}
        style={{ height: '500px', width: '100%' }}
        maxBounds={pangasinanBounds}
        maxBoundsViscosity={1.0}
        minZoom={9}
        maxZoom={15}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event) => (
          <Marker key={event.id} position={[event.lat, event.lng]} icon={createPulsatingIcon(event.title)}>
            <Popup className="bg-yellow-100 text-brown-800 border-2 border-yellow-800 rounded-lg">
              <h3 className="font-bold">{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Points: <span className="text-green-600">+{event.points}</span></p>
              <button className="bg-green-500 text-white px-2 py-1 rounded mt-2">Claim Reward</button>
            </Popup>
            <ProgressCircle
              lat={event.lat}
              lng={event.lng}
              progress={userProgress[event.id] || 0}
              points={event.points}
              baseRadius={50}
              scaleFactor={10}
              maxRadius={500}
            />
          </Marker>
        ))}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={createUserIcon()}>
            <Popup className="bg-blue-100 text-blue-800 border-2 border-blue-800 rounded-lg">
              <h3 className="font-bold">You are here!</h3>
              <p>Lat: {userLocation.lat.toFixed(4)}</p>
              <p>Lng: {userLocation.lng.toFixed(4)}</p>
            </Popup>
          </Marker>
        )}
        {(selectedEvent || userLocation) && (
          <MapController selectedEvent={selectedEvent} userLocation={userLocation} />
        )}
      </MapContainer>
      {locationError && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          {locationError}
        </div>
      )}
    </GamifiedMapContainer>
  );
}

export default GamifiedMap;