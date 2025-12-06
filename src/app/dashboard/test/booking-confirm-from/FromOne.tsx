"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Mail, Hash, DollarSign, Globe, Users, Tag } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { PassengerCard } from "@/components/form/pax-form/PassangerForm";
import { paxGroupValidatior } from "@/utils/validator/paxGroupValidatior";
import { InputField } from "@/components/ui/InputField";
import { AlertMessage } from "@/components/ui/AlertMessage";

// --- Constants (unchanged) ---
const currency = [
  { currency: "USD", currencyName: "US Dollar", flag: "🇺🇸" },
  { currency: "EUR", currencyName: "Euro", flag: "🇪🇺" },
  { currency: "GBP", currencyName: "British Pound", flag: "🇬🇧" },
];

const PLATFORM = [
  { value: "SP", label: "Spanish" },
  { value: "C", label: "English" },
  { value: "IT", label: "Italian" },
  { value: "DE", label: "German" },
  { value: "PT", label: "Portuguese" },
  { value: "FR", label: "French" },
];

const REQUEST_TYPE = [
  { value: "NEWBOOKING", label: "New Booking" },
  { value: "CHANGEBOOKING", label: "Change Booking" },
  { value: "CANCELLATION", label: "Cancellation" },
  { value: "PETADD", label: "Add Pet" },
  { value: "SEATUPGRADE", label: "Seat Upgrade" },
  { value: "OTHERS", label: "Other Request" },
];

const initialFormData = {
  status: "",
  platform: "",
  passengers: [{ firstName: "", lastName: "", dob: "", gender: "" }],
  email: "",
  gdsRefNo: "",
  ticketNumber: "",
  currency: "",
  totalPrice: "",
  netCost: "",
  mco: "0.00",
};

const FromOne = ({ formType = "" }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newPassengers = [...prev.passengers];
      newPassengers[index] = { ...newPassengers[index], [name]: value };
      return { ...prev, passengers: newPassengers };
    });
    const key = `passenger-${index}-${name}`;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const addPassenger = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      passengers: [
        ...prev.passengers,
        { firstName: "", lastName: "", dob: "", gender: "" },
      ],
    }));
  }, []);

  const removePassenger = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      passengers: prev.passengers.filter((_, i) => i !== index),
    }));
    setErrors((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`passenger-${index}-`)) delete updated[key];
      });
      return updated;
    });
  }, []);

  // --- Auto-calculate MCO (unchanged) ---
  useEffect(() => {
    const totalPrice = parseFloat(formData.totalPrice) || 0;
    const netCost = parseFloat(formData.netCost) || 0;
    const mco = Math.max(0, totalPrice - netCost).toFixed(2);
    if (formData.mco !== mco) {
      setFormData((prev) => ({ ...prev, mco }));
    }
  }, [formData.totalPrice, formData.netCost]);

  // --- Submit (unchanged) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = paxGroupValidatior(formData);
    setErrors(error);
    if (error) {
      console.log("✅ Valid Form Data:", formData);
    } else {
      console.log("❌ Validation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      {/* Header */}
      <div className="h-[65vh] px-3 overflow-y-scroll ">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          New Booking Request
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details below to create a new travel reservation
        </p>
      </div>   

      {/* Passengers */}
      <section>
         {/* Status & Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="relative ">

        <Dropdown
          name="status"
          options={REQUEST_TYPE}
          label="Request Type"
          icon={Tag}
          value={formData.status}
          onChange={(value) =>
            handleInputChange({ target: { name: "status", value } })
          }
        />
        <AlertMessage >
          {errors.status}
        </AlertMessage>
          </div>
        {formType === "" && (
          <div className="relative">
          <Dropdown
            options={PLATFORM}
            name="platform"
            label="Platform Language"
            icon={Globe}
            value={formData.platform}
            onChange={(value) =>
              handleInputChange({ target: { name: "platform", value } })
            }
          />
           <AlertMessage >
          {errors.platform}
        </AlertMessage>
        </div>
        )}
      </div>

      <hr className="border-t border-[#eaeaea] my-7" />
      
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#64748b]" />
            Passenger Details
          </h3>
          <button
            type="button"
            onClick={addPassenger}
            className="text-xs text-gray-700 font-medium px-3 py-1.5 rounded-md border border-[#cbd5e1] hover:bg-[#f8fafc] transition"
          >
            + Add Passenger
          </button>
        </div>
        <div className="space-y-4">
          {formData.passengers.map((passenger, index) => (
            <PassengerCard
              key={index}
              index={index}
              passenger={passenger}
              onRemove={removePassenger}
              onPassengerChange={handlePassengerChange}
              // onGenderChange={handleGenderChange}
              errors={errors}
            />
          ))}
        </div>
      </section>

      <hr className="border-t border-[#eaeaea] my-7" />

      {/* Booking Info */}
      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Hash className="w-4 h-4 text-[#64748b]" />
          Booking Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            name="email"
            label="Contact Email"
            icon={Mail}
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <InputField
            name="gdsRefNo"
            label="GDS Ref No"
            icon={Hash}
            value={formData.gdsRefNo}
            onChange={handleInputChange}
          />
          <InputField
            name="ticketNumber"
            label="Ticket Number"
            icon={Hash}
            value={formData.ticketNumber}
            onChange={handleInputChange}
          />
        </div>
      </section>

      <hr className="border-t border-[#eaeaea] my-7" />

      {/* Pricing */}
      <section className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#64748b]" />
          Pricing Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <InputField
            name="totalPrice"
            label="Total Price"
            icon={DollarSign}
            type="number"
            min="0"
            step="0.01"
            value={formData.totalPrice}
            onChange={handleInputChange}
            error={errors.totalPrice}
          />
          <InputField
            name="netCost"
            label="Net Cost"
            icon={DollarSign}
            type="number"
            min="0"
            step="0.01"
            value={formData.netCost}
            onChange={handleInputChange}
            error={errors.netCost}
          />
          <InputField
            name="mco"
            label="MCO (Markup)"
            icon={DollarSign}
            value={formData.mco}
            disabled
            className="bg-[#f8fafc]"
          />
        </div>
      </section>

   </div>
      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#4f46e5] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#4338ca] transition focus:outline-none focus:ring-2 focus:ring-[#c7d2fe] focus:ring-offset-2"
        >
          Submit Booking Request
        </button>
      </div>
      
    </form>
  );
};

export default FromOne;
