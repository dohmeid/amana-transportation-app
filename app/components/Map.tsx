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
  popupAnchor: [0, -20],
});

const stopIcon = new Icon({
  iconUrl: '/icons/location-icon.jpg',
  iconSize: [30, 30],
  className: 'leaflet-stop-icon',
});

const Map = ({ busData }: MapProps) => {
  const mapRef = useRef<L.Map>(null);

  const { position, routeCoordinates, nextStop } = useMemo(() => {
    if (!busData) {
      return { position: null, routeCoordinates: [], nextStop: null };
    }
    const pos: [number, number] = [
      busData.current_location.latitude,
      busData.current_location.longitude,
    ];
    const routeCoords: LatLngExpression[] = busData.bus_stops.map((stop) => [
      stop.latitude,
      stop.longitude,
    ]);
    const foundNextStop =
      busData.bus_stops.find((stop) => stop.is_next_stop) || null;

    return { position: pos, routeCoordinates: routeCoords, nextStop: foundNextStop };
  }, [busData]);

  useEffect(() => {
    if (mapRef.current && position && routeCoordinates.length > 0) {
      const allPoints: LatLngExpression[] = [position, ...routeCoordinates];
      const bounds = new LatLngBounds(allPoints as LatLngExpression[]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });

      // Fix Leaflet rendering issues when resizing
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 300);
    }
  }, [position, routeCoordinates]);

  if (!busData || !position) {
    return (
      <div className="h-64 md:h-96 w-full flex items-center justify-center bg-gray-200">
        Please select a bus route to view the map.
      </div>
    );
  }

  const polylineOptions = {
    color: '#581c87', // A purple color to match your theme
    weight: 5,
  };

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        touchZoom={true}
        zoomControl={true}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://cartodb-basemaps-a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {busData.bus_stops.map((stop) => (
          <Marker key={stop.id} position={[stop.latitude, stop.longitude]} icon={stopIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{stop.name}</h3>
                <p>
                  Next Bus Arrival Time:{' '}
                  <span className="font-semibold">{stop.estimated_arrival}</span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        <Marker
          position={[busData.current_location.latitude, busData.current_location.longitude]}
          icon={busIcon}
          zIndexOffset={100}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg">
                Bus {busData.id}, {busData.name}
              </h3>
              <p>
                Status: <span className="font-semibold text-green-600">{busData.status}</span>
              </p>
              <p>
                Capacity:{' '}
                <span className="font-semibold">
                  {((busData.passengers.current / busData.passengers.capacity) * 100).toFixed(2)}%
                </span>
              </p>
              <p>
                Next Stop: <span className="font-semibold">{nextStop?.name || 'N/A'}</span>
              </p>
            </div>
          </Popup>
        </Marker>

        <Polyline pathOptions={polylineOptions} positions={routeCoordinates} />
      </MapContainer>
    </div>
  );
};

export default Map;
