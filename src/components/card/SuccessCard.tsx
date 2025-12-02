import React from "react";
type SuccessCardProps = {
    isOpen?: boolean,
    title?: string,
    description?: string,
    onContinue?: () => void
};

export default function SuccessCard({ isOpen = false,title = "success",description = "your submission has been received",onContinue}:SuccessCardProps) {
  if(!isOpen) return null
  return (
      <div className="min-w-sm w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center animate-fadeIn">
        
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-2xl first-letter:uppercase font-semibold text-gray-800">
          {title}
        </h1>

        <p className="first-letter:uppercase text-gray-600 mt-2">
          {description}
        </p>

        <button
        onClick={onContinue}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          Continue
        </button>

      </div>
  );
}
