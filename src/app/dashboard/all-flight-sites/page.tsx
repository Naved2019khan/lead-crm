import { Heading } from '@/components/ui/Heading';
import { ProductGrid } from '@/components/grid/ProductGrid';
interface Site {
  id: string;
  name: string;
  location?: string;
  status?: 'active' | 'inactive';
}

function Page({}) {
  const sampleSites: Site[] = [
    { id: '1', name: 'New York Office', location: 'Manhattan, NY', status: 'active' },
    { id: '2', name: 'Los Angeles Hub', location: 'Downtown LA', status: 'active' },
    { id: '3', name: 'Chicago Center', location: 'Loop District', status: 'inactive' },
    { id: '4', name: 'Houston Facility', location: 'Energy Corridor', status: 'active' },
    { id: '5', name: 'Phoenix Branch', location: 'Central Phoenix', status: 'active' },
    { id: '6', name: 'Philadelphia Site', location: 'Center City', status: 'active' },
  ];
  return (
    <div className='mx-12 mt-4'>
      <Heading level="h2" align="left" subtitle='Flight Lead Section'>Flight Sites</Heading>
      <ProductGrid sites={sampleSites}/></div>
  )
}

export default Page