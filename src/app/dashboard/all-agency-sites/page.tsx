import { Heading } from '@/components/ui/Heading';
import { ProductGrid } from '@/components/grid/ProductGrid';
interface Site {
  siteId: string;
  siteName: string;
  siteDomain?: string;
  status?: 'active' | 'inactive';
}

function Page({}) {
  const sampleSites: Site[] = [
    { siteId: '1', siteName: 'Agency one', siteDomain: 'Manhattan, NY', status: 'active' },
    { siteId: '2', siteName: 'Agency Los Angeles Hub', siteDomain: 'Downtown LA', status: 'active' },
    { siteId: '3', siteName: 'Agency Chicago Center', siteDomain: 'Loop District', status: 'inactive' },
    { siteId: '4', siteName: 'Agency Houston Facility', siteDomain: 'Energy Corridor', status: 'active' },
    { siteId: '5', siteName: 'Agency Phoenix Branch', siteDomain: 'Central Phoenix', status: 'active' },
    { siteId: '6', siteName: 'Philadelphia Site', siteDomain: 'Center City', status: 'active' },
  ];
  return (
    <div className='mx-12 mt-4'>
      <Heading level="h2" align="left" subtitle='Software Lead Section'>Software Agency Sites</Heading>
      <ProductGrid sites={sampleSites}/></div>
  )
}

export default Page