"use client"
import { X, Mail, Phone, MapPin, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { useState } from 'react';


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
   notes: [{ body: string, date: Date }]
}

export const LeadAction = ({selectedLead}) => {
    const [isEdit,setIsEdit]= useState(false)
    
    if(isEdit){
        return <EditLeadForm selectedLead={selectedLead} onClose={() => setIsEdit(false)}/>
    }

    return (
        <StaticLeadFrom key={"second"} selectedLead={selectedLead} onEdit={() => setIsEdit(true)} onClose={() => setIsEdit(false)} />
    )



}


const StaticLeadFrom = ({selectedLead,onClose,onEdit}) => {
      const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };
  return (
     <div className="bg-white rounded-lg shadow-xl min-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Lead Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-medium">
                  {selectedLead.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedLead.fullName}</h4>
                  <p className="text-sm text-gray-500">{selectedLead.company || "N/A"} </p>
                  <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{selectedLead.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{selectedLead.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="text-sm text-gray-900">{selectedLead.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Created Date</p>
                    <p className="text-sm text-gray-900">{selectedLead.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Potential Value</p>
                    <p className="text-sm text-gray-900">{selectedLead.value}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Source</p>
                    <p className="text-sm text-gray-900">{selectedLead.source}</p>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="border-t border-gray-200 pt-6">
                <h5 className="text-sm font-semibold text-gray-900 mb-3">Notes</h5>
                {selectedLead?.notes?.map((note, index) => (
                  <div key={index} className="mb-3">
                    <p className="text-sm text-gray-700 leading-relaxed">{note.body}</p>
                    <p className="text-xs text-gray-500">{note.date}</p>
                  </div>
                ))}
                {/* <p className="text-sm text-gray-700 leading-relaxed">{selectedLead.notes}</p> */}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button onClick={onEdit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Edit Lead
              </button>
            </div>
        </div>
  )
}



const EditLeadForm = ({ selectedLead, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: selectedLead?.name || "",
    email: selectedLead?.email || "",
    phone: selectedLead?.phone || "",
    company: selectedLead?.company || "",
    location: selectedLead?.location || "",
    status: selectedLead?.status || "new",
    value: selectedLead?.value || "",
    notes: selectedLead?.notes || "",
    createdAt: selectedLead?.createdAt || "",
    source: selectedLead?.source || "",
  });

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-green-100 text-green-800",
      lost: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form); // 🔥 returns updated lead object
  };

  return (
    <div className="bg-white rounded-lg shadow-xl min-w-2xl w-full max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Edit Lead</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6">
  {/* Profile Section */}
  <div className="flex items-center gap-4 mb-6">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center text-white text-xl font-medium">
      {form.name.split(" ").map((n) => n[0]).join("")}
    </div>

    <div>
    <div className='flex flex-col
    '>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="text-lg font-semibold text-gray-900  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-fit"
        />

      <input
        name="company"
        value={form.company}
        onChange={handleChange}
        className="text-sm text-gray-500  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-fit mt-1"
        />
        </div>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className={`mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${getStatusColor(form.status)}`}
      >
        <option value="new">new</option>
        <option value="contacted">contacted</option>
        <option value="qualified">qualified</option>
        <option value="lost">lost</option>
      </select>
    </div>
  </div>

  {/* Info Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div className="flex items-start gap-3">
      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-xs text-gray-500 mb-1">Email</p>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="text-sm text-gray-900  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-full"
        />
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-xs text-gray-500 mb-1">Phone</p>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="text-sm text-gray-900  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-full"
        />
      </div>
    </div>

    <div className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-xs text-gray-500 mb-1">Location</p>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="text-sm text-gray-900  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-full"
        />
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-xs text-gray-500 mb-1">Created Date</p>
        <input
          name="createdAt"
          value={form.createdAt}
          onChange={handleChange}
          className="text-sm text-gray-900  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-full"
        />
      </div>
    </div>

    <div className="flex items-start gap-3">
      <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-xs text-gray-500 mb-1">Potential Value</p>
        <input
          name="value"
          value={form.value}
          onChange={handleChange}
          className="text-sm text-gray-900  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-full"
        />
      </div>
    </div>

    <div className="flex items-start gap-3">
      <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-xs text-gray-500 mb-1">Source</p>
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          className="text-sm text-gray-900  bg-gray-50 border-0 px-2 py-1 outline-none rounded-md w-full"
        />
      </div>
    </div>
  </div>

  {/* Notes Section */}
  <div className="border-t border-gray-200 pt-6">
    <h5 className="text-sm font-semibold text-gray-900 mb-3">Notes</h5>
    <textarea
      name="notes"
      value={form.notes}
      onChange={handleChange}
      className="text-sm text-gray-700 border p-2 rounded-md w-full"
      rows={4}
    />
  </div>
</div>


      {/* Footer */}
      <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
        <button onClick={onClose} className="px-4 py-2 text-sm bg-white border rounded-lg">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};



export default LeadAction