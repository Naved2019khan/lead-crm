import React from 'react'
import { SelectionGrid } from '@/components/Listings/SelectionGrid';
import { Heading } from '@/components/ui/Heading';
interface Site {
  id: string;
  name: string;
  location?: string;
  status?: 'active' | 'inactive';
}

function Page({}) {
  const sampleSites: Site[] = [
    { id: '1', name: 'Agency one', location: 'Manhattan, NY', status: 'active' },
    { id: '2', name: 'Agency Los Angeles Hub', location: 'Downtown LA', status: 'active' },
    { id: '3', name: 'Agency Chicago Center', location: 'Loop District', status: 'inactive' },
    { id: '4', name: 'Agency Houston Facility', location: 'Energy Corridor', status: 'active' },
    { id: '5', name: 'Agency Phoenix Branch', location: 'Central Phoenix', status: 'active' },
    { id: '6', name: 'Philadelphia Site', location: 'Center City', status: 'active' },
  ];
  return (
    <div className='mx-12 mt-4'>
      <Heading level="h2" align="left" subtitle='Software Lead Section'>Software Agency Sites</Heading>
      <SelectionGrid sites={sampleSites}/></div>
  )
}

export default Page