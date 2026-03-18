'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapContentProps {
  location: string;
}

export default function MapContent({ location }: MapContentProps) {
  const [coordinates, setCoordinates] = useState<[number, number]>([40.4168, -3.7038]); // Default Madrid

  useEffect(() => {
    // In a real application, you would geocode the 'location' string here using a service like Google Maps API or OpenStreetMap Nominatim
    // For this demo, we'll try a rough geocoding or fallback to a default depending on keyword matches
    const searchLocation = location.toLowerCase();
    
    if (searchLocation.includes('palo alto')) {
      setCoordinates([37.4419, -122.1430]);
    } else if (searchLocation.includes('barcelona')) {
      setCoordinates([41.3851, 2.1734]);
    } else if (searchLocation.includes('costa del sol')) {
      setCoordinates([36.5009, -4.8903]);
    } else if (searchLocation.includes('pirineos')) {
      setCoordinates([42.6333, 0.6500]);
    }
  }, [location]);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={coordinates} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup>
            <div className="font-display font-medium text-nordic">
              {location}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      <a 
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded shadow-sm text-nordic hover:text-mosque z-[1000] backdrop-blur-sm"
      >
        View on Map
      </a>
    </div>
  );
}
