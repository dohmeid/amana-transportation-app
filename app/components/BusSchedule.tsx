import React from 'react';

const scheduleData = [
    { route: '101', origin: 'Downtown Central', destination: 'Uptown Mall', time: '08:00 AM' },
    { route: '102', origin: 'Westside Station', destination: 'Eastside Plaza', time: '08:15 AM' },
    { route: '205', origin: 'North Park', destination: 'South Bay', time: '08:30 AM' },
    { route: '101', origin: 'Downtown Central', destination: 'Uptown Mall', time: '09:00 AM' },
    { route: '303', origin: 'Airport', destination: 'City University', time: '09:05 AM' },
    { route: '102', origin: 'Westside Station', destination: 'Eastside Plaza', time: '09:15 AM' },
];

export function BusSchedule() {
  return (
    <section id="schedule" className="py-12 bg-gray-50 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Today's Schedule
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Real-time bus departures and arrivals.
          </p>
        </div>

        {/* Desktop Table View: Hidden on screens smaller than md */}
        <div className="hidden md:block shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduleData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.origin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View: Hidden on screens md and larger */}
        <div className="md:hidden space-y-4">
          {scheduleData.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-500">ROUTE <span className="text-lg text-blue-600">{item.route}</span></div>
                <div className="text-lg font-semibold text-gray-800">{item.time}</div>
              </div>
              <div className="mt-3 text-sm">
                <p><span className="font-medium text-gray-500">From:</span> <span className="text-gray-700">{item.origin}</span></p>
                <p className="mt-1"><span className="font-medium text-gray-500">To:</span> <span className="text-gray-700">{item.destination}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div> </section>
  );
}
export default BusSchedule;