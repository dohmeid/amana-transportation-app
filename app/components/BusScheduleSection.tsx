'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { busData } from '../../data';
import { BusSelector } from './BusSelector';

type BusStop = {
  name: string;
  estimated_arrival: string;
  is_next_stop: boolean;
};

interface BusScheduleTableProps {
  stops: BusStop[];
}

function BusScheduleTable({ stops }: BusScheduleTableProps) {
  if (stops.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please select a bus line to see its schedule.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full table-fixed">
      <thead className="sticky top-0 bg-gray-100 z-10">
        <tr>
          <th scope="col" className="w-[70%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
            Bus Stop
          </th>
          <th scope="col" className="w-[30%] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
            Next Time of Arrival
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {stops.map((item) => (
          <tr key={item.name} className={`${item.is_next_stop ? "bg-amber-400 hover:bg-amber-500" : "hover:bg-gray-50"}`}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">{item.name}</td>
            <td className="px-3 py-4 whitespace-nowrap text-sm font-semibold text-purple-700">{item.estimated_arrival}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BusScheduleList({ stops }: BusScheduleTableProps) {
  if (stops.length === 0) {
    return (
      <div className="flex items-center justify-center h-full py-10">
        <p className="text-gray-500 text-center px-4">Please select a bus line to see its schedule.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stops.map((item) => (
        <div key={item.name} className={`p-4 rounded-lg shadow ${item.is_next_stop ? "bg-amber-400" : "bg-white"}`}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">{item.name}</span>
            <span className={`text-sm font-semibold ${item.is_next_stop ? 'text-gray-900' : 'text-purple-700'}`}>
              {item.estimated_arrival}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BusScheduleSection() {
  const busLines = busData.bus_lines;
  const [selectedBusId, setSelectedBusId] = useState<number | null>(busLines[0]?.id ?? null);

  const selectedBusData = useMemo(() => {
    if (selectedBusId === null) return null;
    return busLines.find(bus => bus.id === selectedBusId) || null;
  }, [selectedBusId]);

  const handleBusSelection = (id: number) => {
    setSelectedBusId(id);
  };

  return (
    <section id="schedule" className="py-12 bg-gray-50 sm:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Bus's Schedule
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Real-time bus departures and arrivals.
          </p>
        </div>

        {/* bus buttons */}
        <BusSelector
          selectedBusId={selectedBusId}
          onBusSelect={handleBusSelection}
        />

        {/* Desktop Table View */}
        <div className="hidden md:block mx-auto max-w-2xl">
          <div className="shadow-md sm:rounded-lg overflow-auto h-[480px] relative">
              <BusScheduleTable stops={selectedBusData?.bus_stops ?? []} />
          </div>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden mt-8">
          <BusScheduleList stops={selectedBusData?.bus_stops ?? []} />
        </div>

      </div>

    </section>
  );
}

export default BusScheduleSection;