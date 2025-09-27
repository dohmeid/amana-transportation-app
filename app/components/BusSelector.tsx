'use client';
import React from 'react';
import { busData } from '../../data';

type BusSelectorProps = {
    selectedBusId: number | null;
    onBusSelect: (id: number) => void;
};

export function BusSelector({ selectedBusId, onBusSelect }: BusSelectorProps) {
    const busLines = busData.bus_lines;

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {busLines.map((bus) => (
                <button
                    key={bus.id}
                    onClick={() => onBusSelect(bus.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:cursor-pointer ${selectedBusId === bus.id ? 'bg-purple-950 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    Bus {bus.id}
                </button>
            ))}
        </div>
    );
}