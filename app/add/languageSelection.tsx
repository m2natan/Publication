// components/LanguageSelector.tsx
"use client"; // This component needs to be a client component because it uses useState and handles user interaction

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { LANGUAGE_MAP } from "../types/types";

// Assuming this LANGUAGE_MAP is defined in your types.ts file
// For this example, I'll include it directly for self-containment.
// In your actual project, you would import it:
// import { LANGUAGE_MAP } from "@/types";


type LanguageSelectorProps = {
  initialLanguageCode?: string; // Optional: to set a default selected language
  onLanguageChange?: (languageCode: string) => void; // Optional: callback for when language changes
  className?: string; // Optional: for additional styling
};

export default function LanguageSelector({
  initialLanguageCode = "", // Default to empty string for "Select Language"
  onLanguageChange,
  className = "",
}: LanguageSelectorProps) {

  const handleChange = (newLanguageCode: string) => {
    if (onLanguageChange) {
      onLanguageChange(newLanguageCode);
    }
  };
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor="language-select"
        className="text-sm font-medium text-gray-700"
      >
        Select Language:
      </label>
      <Select
        value={initialLanguageCode} // Controlled component: value comes from parent prop
        onValueChange={handleChange} // Callback for value changes
      >
        <SelectTrigger id="language-select" className="w-full">
          <SelectValue placeholder="-- Select a Language --" />
        </SelectTrigger>
        <SelectContent>
          {/* Optional: Add a default empty item if you want */}
          {Object.entries(LANGUAGE_MAP).map(([code, fullName]) => (
            <SelectItem className="text-sm text-gray-600 mt-1" key={code} value={code}>
              {fullName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
