"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
        <Button onClick={()=> router.push("/add")}>Add an item</Button>
        <Button onClick={()=> router.push("/update")}>Update</Button>
        <Button onClick={()=> router.push("/generate")}>Generate</Button>
      </main>
    </div>
  );
}
