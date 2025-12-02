"use client";

import { useState } from "react";
import { LeadEditForm } from "./LeadEditForm";
import LeadStaticFrom from "./LeadStaticFrom";

interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "lost";
  value: string;
  source: string;
  createdAt: string;
  location: string;
  notes: [{ body: string; date: Date }];
}

export const LeadAction = ({ selectedLead, onClose }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = (value) => {
    setIsEdit(value);
  };

  if (isEdit)
    return <LeadEditForm selectedLead={selectedLead} onEdit={handleEdit} onClose={onClose} />;

  return (
    <LeadStaticFrom key={"second"} selectedLead={selectedLead} onEdit={() => setIsEdit(true)} onClose={onClose}
    />
  );
};




export default LeadAction;
