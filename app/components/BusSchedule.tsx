import React from 'react';

interface BusStop {
  id: number;
  name: string;
  estimated_arrival: string;
  is_next_stop: boolean;
}

interface BusScheduleProps {
  busStops: BusStop[];
}

const BusSchedule = ({ busStops }: BusScheduleProps) => {
  if (!busStops || busStops.length === 0) {
    return <div className="text-center text-gray-500 py-8">Please select a bus route to see the schedule.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-bold text-gray-600 uppercase tracking-wider">Bus Stop</th>
            <th className="py-3 px-4 text-left font-bold text-gray-600 uppercase tracking-wider">Next Time of Arrival</th>
          </tr>
        </thead>
        <tbody>
          {busStops.map((stop) => (
            <tr key={stop.id} className={stop.is_next_stop ? 'bg-orange-200' : 'hover:bg-gray-50'}>
              <td className="py-3 px-4 border-b border-gray-200 font-semibold">{stop.name}</td>
              <td className="py-3 px-4 border-b border-gray-200">{stop.estimated_arrival}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusSchedule;