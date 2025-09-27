'use client';
import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { busData } from '../../data';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-96 w-full flex items-center justify-center bg-gray-200">Loading map...</div>
});

const BusMapSection = () => {
  //  const [selectedBusId, setSelectedBusId] = useState<number>(1);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSelectedBusId(1); // Set initial bus ID on the client
  }, []);


  //all the buses data 
  const busLines = busData.bus_lines;

  const selectedBusData = useMemo(() => {
    return busLines.find(bus => bus.id === selectedBusId) || null;
  }, [selectedBusId, busLines]);

  const handleBusSelection = (id: number) => {
    setSelectedBusId(id);
  };

  // To prevent hydration mismatch, we can delay rendering of the interactive parts
  if (!isClient) {
    return null; // Or a loading skeleton
  }


  return (
    <section id="map" className="py-12 px-4" >

      <h2 className="text-3xl font-bold text-center mb-8">Active Bus Map</h2>

      {/* bus buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {busLines.map((bus) => (
          <button
            key={bus.id}
            onClick={() => handleBusSelection(bus.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:cursor-pointer
              ${selectedBusId === bus.id
                ? 'bg-purple-950 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Bus {bus.id}
          </button>
        ))}
      </div>

      <div className="h-140 w-300  mx-auto rounded-lg shadow-lg">
        <Map busData={selectedBusData} />
      </div>
    </section>
  );
};
export default BusMapSection;
