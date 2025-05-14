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

const getIconSize = (eventTitle, isMobile) => {
  const baseSize = isMobile ? 18 : 22; // Slightly smaller icons
  return eventTitle === 'Mangrove Planting' ? [baseSize * 1.25, baseSize * 1.25] : [baseSize, baseSize];
};

const createPulsatingIcon = (eventTitle, isMobile) => {
  const size = getIconSize(eventTitle, isMobile);
  return L.divIcon({
    html: `<div class="pulsating-icon" style="width: ${size[0]}px; height: ${size[1]}px;"></div>`,
    className: '',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });
};

const createUserIcon = (isMobile) => {
  const size = isMobile ? 22 : 26; // Slightly smaller user icon
  return L.divIcon({
    html: `<div class="user-icon" style="width: ${size}px; height: ${size}px;"></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const GamifiedMapContainer = styled.div`
  position: relative;
  background: url('https://www.transparenttextures.com/patterns/parchment.png');
  border: 2px solid #8b4513;
  border-radius: 8px; /* Slightly smaller border-radius */
  box-shadow: 0 0 8px rgba(139, 69, 19, 0.4); /* Softer shadow */
  width: 100%;
  height: 400px; /* Fixed height for desktop, reduced from calc(100vh - 200px) */
  min-height: 250px; /* Reduced min-height */
  overflow: hidden;

  @media (max-width: 768px) {
    height: 300px; /* Smaller height for tablets */
    min-height: 200px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    height: 250px; /* Smaller height for mobile */
    min-height: 180px;
    border-radius: 4px;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: 8px; /* Adjusted for smaller map */
  left: 8px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 4px 8px; /* Slightly smaller padding */
  border-radius: 4px;
  z-index: 1000;
  font-size: 12px; /* Smaller font size */
  max-width: 80%;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 6px;
    bottom: 6px;
    left: 6px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 2px 5px;
    bottom: 5px;
    left: 5px;
  }
`;

function ProgressCircle({ lat, lng, progress, points, baseRadius = 40, scaleFactor = 8, maxRadius = 400 }) {
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

function MapController({ events, selectedEvent, userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Auto-fit bounds to all events
    if (events && events.length > 0) {
      const bounds = L.latLngBounds(
        events.map(event => [event.lat, event.lng])
      );
      if (userLocation && bounds.contains([userLocation.lat, userLocation.lng])) {
        bounds.extend([userLocation.lat, userLocation.lng]);
      }
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 }); // Slightly smaller padding
    }

    // Adjust for selected event or user location
    if (selectedEvent && map) {
      map.flyTo([selectedEvent.lat, selectedEvent.lng], 13, {
        animate: true,
        duration: 1.2, // Slightly faster animation
      });
    } else if (userLocation && map) {
      map.flyTo([userLocation.lat, userLocation.lng], 13, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [map, events, selectedEvent, userLocation]);

  return null;
}

function GamifiedMap({ events, selectedEvent }) {
  const [userProgress, setUserProgress] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const pangasinanBounds = L.latLngBounds(
    [15.7, 119.7],
    [16.4, 120.7]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (
            latitude >= 15.7 &&
            latitude <= 16.4 &&
            longitude >= 119.7 &&
            longitude <= 120.7
          ) {
            setUserLocation({ lat: latitude, lng: longitude });
            setLocationError(null);
          } else {
            setLocationError('Your location is outside Pangasinan. Showing event locations only.');
          }
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location. Showing event locations only.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Location access denied. Please enable location permissions to see your position.';
          } else if (error.message.includes('permissions policy')) {
            errorMessage = 'Location access is blocked by the site\'s permissions policy. Showing event locations only.';
          }
          setLocationError(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Showing event locations only.');
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
        .leaflet-container {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <MapContainer
        center={[16.0433, 120.3333]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
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
          <Marker
            key={event.id}
            position={[event.lat, event.lng]}
            icon={createPulsatingIcon(event.title, isMobile)}
          >
            <Popup className="bg-yellow-100 text-brown-800 border-2 border-yellow-800 rounded-lg p-2">
              <h3 className="font-bold text-xs md:text-sm">{event.title}</h3> {/* Smaller text */}
              <p className="text-xs">{event.date}</p>
              <p className="text-xs">
                Points: <span className="text-green-600">+{event.points}</span>
              </p>
              <button className="bg-green-500 text-white px-2 py-1 rounded mt-1 text-xs">
                Claim Reward
              </button>
            </Popup>
            <ProgressCircle
              lat={event.lat}
              lng={event.lng}
              progress={userProgress[event.id] || 0}
              points={event.points}
              baseRadius={isMobile ? 25 : 40} /* Smaller base radius */
              scaleFactor={8}
              maxRadius={isMobile ? 250 : 400} /* Smaller max radius */
            />
          </Marker>
        ))}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={createUserIcon(isMobile)}>
            <Popup className="bg-blue-100 text-blue-800 border-2 border-blue-800 rounded-lg p-2">
              <h3 className="font-bold text-xs md:text-sm">You are here!</h3>
              <p className="text-xs">Lat: {userLocation.lat.toFixed(4)}</p>
              <p className="text-xs">Lng: {userLocation.lng.toFixed(4)}</p>
            </Popup>
          </Marker>
        )}
        {(selectedEvent || userLocation || events.length > 0) && (
          <MapController events={events} selectedEvent={selectedEvent} userLocation={userLocation} />
        )}
      </MapContainer>
      {locationError && <ErrorMessage>{locationError}</ErrorMessage>}
    </GamifiedMapContainer>
  );
}

export default GamifiedMap;