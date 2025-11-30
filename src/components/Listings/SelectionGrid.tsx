"use client"
import React, { useState } from 'react';

interface Site {
    id: string;
    name: string;
    location?: string;
    status?: 'active' | 'inactive';
}

interface SelectionGridProps {
    sites: Site[];
    selectedSites?: string[];
    onSelectionChange?: (selectedIds: string[]) => void;
    columns?: number;
    maxSelection?: number;
}

export const SelectionGrid: React.FC<SelectionGridProps> = ({
    sites,
    selectedSites = [],
    onSelectionChange,
    columns = 3,
    maxSelection,
}) => {


    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-3';

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">


            </div>

            <div className={`grid ${gridCols} gap-4`}>
                {sites.map((site) => {


                    return (
                        <button
                            key={site.id}
                            className={`
                relative p-4 rounded-lg border text-left transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-gray-300/70 hover:-translate-y-0.5
              `}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{site.name}</h3>
                                    {site.location && (
                                        <p className="text-sm text-gray-500 mt-1">{site.location}</p>
                                    )}
                                    {site.status && (
                                        <span className={`
                      inline-block mt-2 px-2 py-0.5 text-xs rounded-full
                      ${site.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                            }
                    `}>
                                            {site.status}
                                        </span>
                                    )}
                                </div>

                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
