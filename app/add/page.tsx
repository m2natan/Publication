"use client";

import { useState } from "react";
import { LANGUAGE_CODES, Publication } from "../types/types";
import axios from "axios";
import LanguageSelector from "./languageSelection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, PopcornIcon } from "lucide-react";

export default function AddPublication() {
  const [form, setForm] = useState<Publication>({
    publication_id: "",
    count: 0,
  });
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<Publication[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true); // Start submission animation
    setMessage(null); // Clear previous messages
    if (
      !form.publication_id ||
      !selectedLanguageCode ||
      form.count === null ||
      form.count === undefined ||
      form.count === 0
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }
    try {
      const hasLangCode = /-\w{2}$/i.test(form.publication_id.trim());

      const baseId = form.publication_id.trim();
      const combinedIdAndLanguage = hasLangCode
        ? baseId // already has a -xx language code
        : `${baseId.toLowerCase()}-${selectedLanguageCode}`;
      const dataSend: Publication = {
        publication_id: combinedIdAndLanguage,
        count: form.count,
      };
      await axios.post("/api/publication", dataSend);
      setMessage({ type: "success", text: "Inserted successful! 🎉" });
      setForm({ publication_id: "", count: 0 });
      setSelectedLanguageCode("");
    } catch (error) {
      console.error("Upsert failed:", error);
      setMessage({ type: "error", text: "Inserted unsuccessful! 🙁" });
    } finally {
      setIsSubmitting(false); // End submission animation
    }
  }

  async function onTyping(publication_id: string) {
    setForm({ ...form, publication_id });

    if (publication_id.length < 1) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axios.get(
        `/api/publication/search?q=${publication_id}`
      );
      if (!response.data.success) {
        alert("Error: " + response.data.error);
        return;
      }
      setSearchResults(response.data.data); // assuming the server returns a list of publications
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  }

  function handleSelect(publication: Publication) {
    const match = publication.publication_id.match(/-(\w{2})$/i);
    const langCode = match ? match[1].toUpperCase() : "";
    
    setForm({
      ...form,
      publication_id: publication.publication_id.replace(/-\w{2}$/, ""),
    });
    setSearchResults([]);
    setShowDropdown(false);
    // Only update selectedLanguageCode if it's a known one
    if (LANGUAGE_CODES.includes(langCode)) {
      setSelectedLanguageCode(langCode);
    }

    setSearchResults([]);
    setShowDropdown(false);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md space-y-6 "
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Add Publication
      </h2>

      {/* ⭐ THIS IS WHERE THE ALERT IS RENDERED CONDITIONALLY ⭐ */}
      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          {message.type === "error" ? (
            <AlertCircleIcon className="h-4 w-4" />
          ) : (
            <PopcornIcon className="h-4 w-4" />
          )}
          <AlertTitle>
            {message.type === "error" ? "Error!" : "Success!"}
          </AlertTitle>
          <AlertDescription>
            {message.text}
            {message.type === "error" && (
              <p>Please try again or contact admin.</p>
            )}
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col">
        <label
          htmlFor="publication_id"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Publication ID
        </label>
        <input
          id="publication_id"
          type="text"
          value={form?.publication_id}
          placeholder="Enter Publication ID"
          onChange={(e) => onTyping(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className="px-3 py-2 border border-gray-300 rounded-md shadow-sm">
            {searchResults.map((pub) => (
              <li
                key={pub.publication_id}
                onClick={() => handleSelect(pub)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {pub.publication_id}
              </li>
            ))}
          </ul>
        )}
      </div>

      <LanguageSelector
        initialLanguageCode={selectedLanguageCode} // Pass current state
        onLanguageChange={setSelectedLanguageCode} // Update state when language changes
        className="flex flex-col" // Add styling for the wrapper div if needed
      />

      <div className="flex flex-col">
        <label
          htmlFor="count"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Count
        </label>
        <input
          id="count"
          type="number"
          value={form?.count === 0 ? "" : form.count}
          placeholder="Enter Count"
          onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center relative"
        disabled={isSubmitting} // Disable button during submission
      >
        {isSubmitting ? (
          // Spinner animation
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
}
