"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  KindeAccessToken,
  KindePermissions,
} from "@kinde-oss/kinde-auth-nextjs/types";

type ClientButtonsProps = {
  roles: KindeAccessToken;
};

export default function ClientButtons({
  roles,
}: ClientButtonsProps) {
  const router = useRouter();
const isUser = roles?.roles?.some(role => role.key === "PUBLICATION_ADMIN") ?? false;

  return (
    <>
      {isUser && (
        <Button onClick={() => router.push("/add")}>Add an item</Button>
      )}
      <Button onClick={() => router.push("/update")}>Update</Button>
      <Button onClick={() => router.push("/generate")}>Generate</Button>
    </>
  );
}
function KindeRole(arg0: string) {
  throw new Error("Function not implemented.");
}
