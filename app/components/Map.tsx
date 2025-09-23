'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

interface BusStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  estimated_arrival: string;
  is_next_stop: boolean;
}

interface BusLine {
  id: number;
  route_number: string;
  current_location: {
    latitude: number;
    longitude: number;
  };
  status: string;
  passengers: {
    current: number;
    capacity: number;
    utilization_percentage: number;
  };
  bus_stops: BusStop[];
}

const busIcon = new Icon({
  iconUrl: '/icons/bus-icon.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const stopIcon = new Icon({
  iconUrl: '/icons/stop-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  busData: BusLine | null;
}

const Map = ({ busData }: MapProps) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current && busData) {
      const { current_location, bus_stops } = busData;
      const allPoints = [
        [current_location.latitude, current_location.longitude],
        ...bus_stops.map(stop => [stop.latitude, stop.longitude]),
      ];

      // @ts-ignore
      const bounds = L.latLngBounds(allPoints);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [busData]);

  if (!busData) {
    return <div className="h-96 w-full flex items-center justify-center bg-gray-200">Please select a bus route to view the map.</div>;
  }

  const { current_location, bus_stops } = busData;
  const position: [number, number] = [current_location.latitude, current_location.longitude];

  return (
    <div className="h-96 w-full">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Bus Marker */}
        <Marker position={position} icon={busIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg">{busData.name}</h3>
              <p>Status: <span className="font-semibold text-green-600">{busData.status}</span></p>
              <p>Capacity: <span className="font-semibold">{busData.passengers.current} / {busData.passengers.capacity}</span></p>
              <p>Next Stop: <span className="font-semibold">{busData.bus_stops.find(stop => stop.is_next_stop)?.name || 'N/A'}</span></p>
            </div>
          </Popup>
        </Marker>
        
        {/* Bus Stop Markers */}
        {bus_stops.map((stop) => (
          <Marker key={stop.id} position={[stop.latitude, stop.longitude]} icon={stopIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{stop.name}</h3>
                <p>Next Arrival: <span className="font-semibold">{stop.estimated_arrival}</span></p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;