"use client";
import React, { use, useRef, useState } from "react";
import { ProductDetailCard } from "../card/ProductDetailCard";
import AddProductCard from "../card/AddProductCard";
import { Modal } from "../ui/Modal";
import { NewProductSite } from "../form/NewProductSite";
import {
  createAgencySites,
  updateAgencySites,
} from "@/services/api/product-api";
import ThankYouModal from "../modal/ThankYouModal";
import { updateSiteAction } from "@/app/actions/updateSiteAction";

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

export const ProductGrid: React.FC<ProductGridProps> = ({
  sites,
  columns = 3,
}) => {
  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    }[columns] || "grid-cols-3";
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(undefined);
  const [isSubmited, setIsSubmited] = useState(false);
  const isNewAgency = !editData;

  const onClose = () => {
    setShowForm(false);
    setEditData(undefined);
  };

  const onEdit = (val) => {
    setShowForm(true);
    setEditData(val);
  };

  const handleNewProduct = async (val) => {
    try {
      const res = await createAgencySites(val);
      await updateSiteAction();
      setIsSubmited(true);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProduct = async (val) => {
    try {
      const res = await updateAgencySites(val);
      await updateSiteAction();
      setIsSubmited(true);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={showForm} onClose={onClose}>
        <NewProductSite
          isEditing
          initialData={editData}
          onSubmit={isNewAgency ? handleNewProduct : handleEditProduct}
        />
      </Modal>

      <ThankYouModal
        isOpen={isSubmited}
        onClose={() => setIsSubmited(false)}
        message={
          isNewAgency
            ? "Agency Created Successfully"
            : "Product Edited Successfully"
        }
      />

      <div className="w-full space-y-4">
        <div className={`grid ${gridCols} gap-4`}>
          <AddProductCard
            title="Click to add agency"
            subtitle="new agency form"
            onClick={() => setShowForm(true)}
          />
          {sites.map((site) => {
            return <ProductDetailCard onEdit={onEdit} site={site} />;
          })}
        </div>
      </div>
    </>
  );
};
