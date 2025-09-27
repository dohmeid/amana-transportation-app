'use client';
import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { busData } from '../../data';
import { BusSelector } from './BusSelector';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-96 w-full flex items-center justify-center bg-gray-200">Loading map...</div>
});

const BusMapSection = () => {
  // Initialize with the first bus ID, or null if no buses exist.
  const [selectedBusId, setSelectedBusId] = useState<number | null>(() => busData.bus_lines[0]?.id ?? null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <BusSelector
        selectedBusId={selectedBusId}
        onBusSelect={handleBusSelection}
      />

      <div className="h-140 w-300  mx-auto rounded-lg shadow-lg">
        <Map busData={selectedBusData} />
      </div>
    </section>
  );
};
export default BusMapSection;
