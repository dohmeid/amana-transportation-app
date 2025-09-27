'use client';
import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { busData } from '../../data';
import { BusSelector } from './BusSelector';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="h-64 md:h-96 w-full flex items-center justify-center bg-gray-200">
      Loading map...
    </div>
  ),
});

const BusMapSection = () => {
  const [selectedBusId, setSelectedBusId] = useState<number | null>(
    () => busData.bus_lines[0]?.id ?? null
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const busLines = busData.bus_lines;

  const selectedBusData = useMemo(() => {
    return busLines.find((bus) => bus.id === selectedBusId) || null;
  }, [selectedBusId, busLines]);

  const handleBusSelection = (id: number) => {
    setSelectedBusId(id);
  };

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <section id="map" className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Active Bus Map</h2>

      {/* Bus buttons */}
      <BusSelector selectedBusId={selectedBusId} onBusSelect={handleBusSelection} />

      {/* Responsive Map Wrapper */}
      <div className="w-full max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Map busData={selectedBusData} />
        </div>
      </div>
    </section>
  );
};

export default BusMapSection;