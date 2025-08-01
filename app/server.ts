// lib/kinde/server.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Role_BASE } from "./types/types";

export async function getUserFromServerSession() {
  const { getUser } = getKindeServerSession();
  return await getUser(); // returns null if not logged in
}

export async function getUserPermission(): Promise<Role_BASE | null> {
  const { getAccessToken } = getKindeServerSession();

  const role = await getAccessToken();

  if (!role) {
    return null;
  }

  return {
    role: role,
  };
}

export async function isAuthorized() {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  return auth;
}
