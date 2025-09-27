'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { busData } from '../../data';


const scheduleData = [
  { route: '101', origin: 'Downtown Central', destination: 'Uptown Mall', time: '08:00 AM' },
  { route: '102', origin: 'Westside Station', destination: 'Eastside Plaza', time: '08:15 AM' },
  { route: '205', origin: 'North Park', destination: 'South Bay', time: '08:30 AM' },
  { route: '101', origin: 'Downtown Central', destination: 'Uptown Mall', time: '09:00 AM' },
  { route: '303', origin: 'Airport', destination: 'City University', time: '09:05 AM' },
  { route: '102', origin: 'Westside Station', destination: 'Eastside Plaza', time: '09:15 AM' },
];

export function BusSchedule() {

  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  useEffect(() => {
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

        <div className="hidden md:block shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus Stop
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Time of Arrival
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {scheduleData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      
      </div> 
      
      </section>
  );
}


/*
 <section id="schedule" className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <BusSchedule busStops={selectedBus?.bus_stops || []} />
        </div>
      </section>

*/
export default BusSchedule;