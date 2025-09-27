'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L, { Icon, LatLngExpression, LatLngBounds } from 'leaflet';
import { BusData } from '../types/index';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  busData: BusData | null;
}

const busIcon = new Icon({
  iconUrl: '/icons/bus-icon.jpg',
  iconSize: [35, 35],
  className: 'leaflet-bus-icon',
  popupAnchor: [0, -55]
});

const stopIcon = new Icon({
  iconUrl: '/icons/location-icon.jpg',
  iconSize: [30, 30],
  className: 'leaflet-stop-icon'
});

const Map = ({ busData }: MapProps) => {
  const mapRef = useRef<L.Map>(null);

  const { position, routeCoordinates, nextStop } = useMemo(() => {
    if (!busData) {
      return { position: null, routeCoordinates: [], nextStop: null };
    }
    const pos: [number, number] = [busData.current_location.latitude, busData.current_location.longitude];
    const routeCoords: LatLngExpression[] = busData.bus_stops.map(stop => [stop.latitude, stop.longitude]);
    const foundNextStop = busData.bus_stops.find(stop => stop.is_next_stop) || null;

    return { position: pos, routeCoordinates: routeCoords, nextStop: foundNextStop };
  }, [busData]);


  useEffect(() => {
    if (mapRef.current && position && routeCoordinates.length > 0) {
      const allPoints: LatLngExpression[] = [position, ...routeCoordinates];
      const bounds = new LatLngBounds(allPoints as LatLngExpression[]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [position, routeCoordinates]);

  if (!busData || !position) {
    return <div className="h-96 w-full flex items-center justify-center bg-gray-200">Please select a bus route to view the map.</div>;
  }

  const polylineOptions = {
    color: '#581c87', // A purple color to match your theme
    weight: 5,
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        ref={mapRef} 
      >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://cartodb-basemaps-a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Loop through all stops and create a marker for each one */}
        {busData.bus_stops.map((stop) => (
          <Marker key={stop.id} position={[stop.latitude, stop.longitude]} icon={stopIcon}>
            <Popup className='w-50 h-25'>
              <div className="text-center">
                <h3 className="font-bold">{stop.name}</h3>
                <p>Next Bus Arrival Time: <span className="font-semibold">{stop.estimated_arrival}</span></p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* A marker for the bus's current location */}
        <Marker position={[busData.current_location.latitude,busData.current_location.longitude]} icon={busIcon} zIndexOffset={100}>
          <Popup className='w-90 h-30'>
            <div className="text-center">
              <h3 className="font-bold text-lg">Bus{busData.id}, {busData.name}</h3>
              <p>Status: <span className="font-semibold text-green-600">{busData.status}</span></p>
              <p>Capacity: <span className="font-semibold">{(busData.passengers.current / busData.passengers.capacity * 100).toFixed(2)}%</span></p>
              <p>Next Stop: <span className="font-semibold">{nextStop?.name || 'N/A'}</span></p>
            </div>
          </Popup>
        </Marker>

        {/* Draw the line connecting all the bus stops */}
        <Polyline pathOptions={polylineOptions} positions={routeCoordinates} />

      </MapContainer>
    </div>
  );
};

export default Map;