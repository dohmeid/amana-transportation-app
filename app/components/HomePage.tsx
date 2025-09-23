'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import BusSchedule from './BusSchedule';
import { amanaData } from '../../data';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div className="h-96 w-full flex items-center justify-center bg-gray-200">Loading map...</div>
});

const HomePage = () => {
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

  const busLines = amanaData.bus_lines;

  const selectedBus = useMemo(() => {
    if (selectedBusId === null) return null;
    return busLines.find(bus => bus.id === selectedBusId) || null;
  }, [selectedBusId, busLines]);

  const handleBusSelection = (id: number) => {
    setSelectedBusId(id);
  };

  const renderBusButtons = () => {
    return (
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {busLines.map((bus) => (
          <button
            key={bus.id}
            onClick={() => handleBusSelection(bus.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
              ${selectedBusId === bus.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
              ${bus.status !== 'Active' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={bus.status !== 'Active'}
            title={bus.status !== 'Active' ? `Bus is currently ${bus.status}` : bus.name}
          >
            {bus.route_number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <section id="map" className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Active Bus Map</h2>
        {renderBusButtons()}
        <div className="max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <Map busData={selectedBus} />
        </div>
      </section>

      <section id="schedule" className="py-12 bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Bus Schedule</h2>
        {renderBusButtons()}
        <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <BusSchedule busStops={selectedBus?.bus_stops || []} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
