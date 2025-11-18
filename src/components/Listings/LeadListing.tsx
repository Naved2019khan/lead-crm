"use client"
import { Eye} from 'lucide-react';

import { useEffect, useState } from 'react';
import { Modal } from '../modal/Modal';
import EditLeadFrom from '../form/EditLeadFrom';
import { getAllLeads } from '@/utils/api/crm';

interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  value: string;
  source: string;
  createdAt: string;
  location: string;
  notes: string;
}



const LeadListing = () =>  {
 const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
 const [leads,setLead] = useState<Lead[]>([])
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {

    async function fetchLeads() {
      setIsLoading(true);
      try {
        const leads = await getAllLeads();
        setLead(leads?.leads);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
      finally{
        setIsLoading(false);
      }
    }
    
    fetchLeads();
    
 },[])
  //   const leads: Lead[] = [
  //   {
  //     id: 1,
  //     name: 'Sarah Johnson',
  //     email: 'sarah.j@techcorp.com',
  //     phone: '+1 (555) 123-4567',
  //     company: 'TechCorp Industries',
  //     status: 'new',
  //     value: '$25,000',
  //     source: 'Website',
  //     createdAt: '2024-11-15',
  //     location: 'San Francisco, CA',
  //     notes: 'Interested in enterprise plan. Requested demo for next week. Has budget approval for Q4.'
  //   },
  //   {
  //     id: 2,
  //     name: 'Michael Chen',
  //     email: 'mchen@innovate.io',
  //     phone: '+1 (555) 234-5678',
  //     company: 'Innovate Solutions',
  //     status: 'contacted',
  //     value: '$45,000',
  //     source: 'LinkedIn',
  //     createdAt: '2024-11-14',
  //     location: 'New York, NY',
  //     notes: 'Follow-up scheduled for next Monday. Very interested in custom integration options.'
  //   },
  //   {
  //     id: 3,
  //     name: 'Emily Rodriguez',
  //     email: 'emily.r@startuphub.com',
  //     phone: '+1 (555) 345-6789',
  //     company: 'StartupHub',
  //     status: 'qualified',
  //     value: '$15,000',
  //     source: 'Referral',
  //     createdAt: '2024-11-13',
  //     location: 'Austin, TX',
  //     notes: 'Ready to move forward. Waiting for contract review from legal team.'
  //   },
  //   {
  //     id: 4,
  //     name: 'David Kim',
  //     email: 'david.kim@globaltech.com',
  //     phone: '+1 (555) 456-7890',
  //     company: 'Global Tech Ltd',
  //     status: 'contacted',
  //     value: '$60,000',
  //     source: 'Conference',
  //     createdAt: '2024-11-12',
  //     location: 'Seattle, WA',
  //     notes: 'Met at TechSummit 2024. Needs solution for team of 50+ users.'
  //   },
  //   {
  //     id: 5,
  //     name: 'Lisa Anderson',
  //     email: 'l.anderson@digitalpro.com',
  //     phone: '+1 (555) 567-8901',
  //     company: 'Digital Pro Agency',
  //     status: 'new',
  //     value: '$12,000',
  //     source: 'Google Ads',
  //     createdAt: '2024-11-11',
  //     location: 'Miami, FL',
  //     notes: 'Small agency looking for scalable solution. Price sensitive.'
  //   },
  //   {
  //     id: 6,
  //     name: 'James Wilson',
  //     email: 'jwilson@enterprise.co',
  //     phone: '+1 (555) 678-9012',
  //     company: 'Enterprise Co',
  //     status: 'lost',
  //     value: '$35,000',
  //     source: 'Cold Email',
  //     createdAt: '2024-11-10',
  //     location: 'Boston, MA',
  //     notes: 'Chose competitor. Price was main concern. Follow up in 6 months.'
  //   }
  // ];



  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                            {lead.fullName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{lead.fullName}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.company || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             {selectedLead && (
            <Modal isOpen={selectedLead !== null} onClose={() => setSelectedLead(null)} title="Lead Details">
              <EditLeadFrom selectedLead={selectedLead} onClose={() => setSelectedLead(null)} />
            </Modal>
      )}
         
          </div>
          
          
  )
}
export default LeadListing