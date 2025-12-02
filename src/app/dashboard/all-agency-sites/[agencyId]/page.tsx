// Use 'use client' for components that need interactivity like 'useState'
import LeadsTable from '@/components/listing/LeadsTable'; // We'll create this next
import { getLeadById } from '@/services/api/crm';

async function LeadsPage({ params}) {
  const { agencyId } = await params
  console.log(agencyId)
  let leads ;
  let error = "";
  try {
     leads = (await getLeadById(agencyId)).lead
     console.log(leads)
  } catch (e) {
    error = e.message
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Agency Leads</h1>
      <LeadsTable leads={leads} />
    </div>
  );
}

export default LeadsPage;