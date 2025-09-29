"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Publication } from "../types/types";
import React from "react";

export default function GeneratePublicationReport() {
  const [publication, setPublication] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLanguages, setExpandedLanguages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/publication");
        setPublication(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch publications:", error);
        setPublication([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return <div className="p-10 text-center">Loading publications...</div>;

  if (!publication.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No publications found.</p>
      </div>
    );
  }

  // --- Group by language (assuming -AM, -EN, etc. at the end of publication_id)
  const grouped = publication.reduce((acc, pub) => {
    const lang = pub.publication_id.split("-").pop() || "UNKNOWN";
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);

  const toggleLanguage = (lang: string) => {
    setExpandedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
        <Table className="justify-center align-center w-3/4 border border-black">
          <TableCaption>Grouped Publications by Language</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Publication Code</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(grouped).map(([lang, pubs]) => (
              <React.Fragment key={lang}>
                {/* Group Header */}
                <TableRow
                  onClick={() => toggleLanguage(lang)}
                  className="bg-gray-300 cursor-pointer hover:bg-gray-400"
                >
                  <TableCell colSpan={3} className="font-bold">
                    {lang} ({pubs.length}){" "}
                    {expandedLanguages.includes(lang) ? "▲" : "▼"}
                  </TableCell>
                </TableRow>

                {/* Expanded Rows */}
                {expandedLanguages.includes(lang) &&
                  pubs.map((p, index) => (
                    <TableRow
                      key={p.publication_id}
                      className={
                        index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                      }
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{p.publication_id}</TableCell>
                      <TableCell>{p.count}</TableCell>
                      <TableCell>
                        {p.updatedAt
                          ? new Date(p.updatedAt).toLocaleString().split(",")[0]
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
