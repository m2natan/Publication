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

export default function GeneratePublicationReport() {
  const [publication, setPublication] = useState<Publication[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/publication");
        setPublication(res.data.data);
      } catch (error) {
        console.error("Failed to fetch publications:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  });

  if (loading) return <p>Loading...</p>;
  return (
    <div className="flex justify-center mt-6">
      <Table className="justify-center align-center w-3/4 border border-black">
        <TableCaption>Generating the summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Publication Code</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publication && publication.length
            ? publication.map((p: Publication, index: number) => (
                <TableRow
                  key={p.publication_id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{p.publication_id}</TableCell>
                  <TableCell>{p.count}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
}
