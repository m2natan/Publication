"use client";
import { useState } from "react";
import LanguageSelector from "../add/languageSelection";
import { Publication } from "../types/types";
import axios from "axios";

export default function UpdatePublication() {
  const [form, setForm] = useState<Publication>({
    publication_id: "",
    count: 0,
  });
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true); // Start submission animation
    try {
      const combinedIdAndLanguage = `${form.publication_id.toLowerCase()}-${selectedLanguageCode}`;
      const dataSend: Publication = {
        publication_id: combinedIdAndLanguage,
        count: form.count,
      };
      const response = await axios.patch("/api/publication", dataSend);
      if (!response.data.success) {
        alert("Error: " + response.data.error);
        return;
      }
      alert("Update successful!");
    } catch (error) {
      console.error("Updating failed:", error);
    } finally {
      setIsSubmitting(false); // End submission animation
    }
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md space-y-6 "
        >
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Update Publication
          </h2>
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
              onChange={(e) =>
                setForm({ ...form, publication_id: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
              onChange={(e) =>
                setForm({ ...form, count: Number(e.target.value) })
              }
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
              "Update"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
