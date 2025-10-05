import React from "react";
export const Loader = ({ label = "Loading" }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
      />
    </div>
    <span className="text-gray-600 font-medium">{label}...</span>
  </div>
);
