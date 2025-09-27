'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { busData } from '../../data';

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

        <div className="hidden md:block mx-auto max-w-2xl">
          <div className="shadow-md sm:rounded-lg overflow-hidden h-[480px] flex flex-col">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-100">
              <tr>
                  <th scope="col" className="w-[70%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Bus Stop
                </th>
                  <th scope="col" className="w-[30%] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Time of Arrival
                </th>
              </tr>
            </thead>

              <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
              {selectedBusData?.bus_stops.map((item, index) => (
                <tr key={index} className={`${item.is_next_stop ? "bg-amber-400 hover:bg-amber-500":"hover:bg-gray-50"}`}
                >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">{item.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-semibold text-purple-700">{item.estimated_arrival}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
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