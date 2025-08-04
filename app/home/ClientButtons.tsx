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

export default function ClientButtons({ roles }: ClientButtonsProps) {
  const router = useRouter();
  const isAdmin =
    roles?.roles?.some((role) => role.key === "PUBLICATION_ADMIN") ?? false;
  const isUser =
    roles?.roles?.some((role) => role.key === "PUBLICATION_USER") ?? false;

  const noRoleUser = !roles?.roles || roles.roles.length === 0;
  return (
    <>
      {isAdmin && (
        <Button onClick={() => router.push("/add")}>Add an item</Button>
      )}
      {isUser && <Button onClick={() => router.push("/update")}>Update</Button>}
      {noRoleUser ? (
        <Button onClick={() => router.push("/sample")}>Generate</Button>
      ) : (
        <Button onClick={() => router.push("/generate")}>Generate</Button>
      )}
    </>
  );
}
