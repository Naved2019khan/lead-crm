"use client";
import React, { useState } from "react";
import { ProductDetailCard } from "../card/ProductDetailCard";
import AddProductCard from "../card/AddProductCard";
import { Modal } from "../modal/Modal";
import { NewProductSite } from "../form/NewProductSite";

interface Site {
  id: string;
  name: string;
  location?: string;
  status?: "active" | "inactive";
}

interface ProductGridProps {
  sites: Site[];
  selectedSites?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  columns?: number;
  maxSelection?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({sites,columns = 3}) => {
  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    }[columns] || "grid-cols-3";
  const [showForm, setShowForm] = useState(false);
  const [editData,setEditData] = useState(undefined);

  const onClose = () => {
    setShowForm(false);
    setEditData(undefined)
  }


  const onEdit = (val) => {
    setShowForm(true);
    setEditData(val)
  };

  return (
    <>
    <Modal isOpen={showForm} onClose={onClose}>
    <NewProductSite isEditing initialData={editData}  />
    </Modal>


    <div className="w-full space-y-4">
      <div className={`grid ${gridCols} gap-4`}>
        <AddProductCard title="Click to add agency" subtitle="new agency form" onClick={()=> setShowForm(true)} />
        {sites.map((site) => {
          return (
            <ProductDetailCard onEdit={onEdit} site={site} />
          );
        })}
      </div>
    </div>
    </>
  );
};
