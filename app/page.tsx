import {
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const { isAuthenticated } = getKindeServerSession();

  const auth = await isAuthenticated();
  if (!auth) {
    return redirect("/api/auth/login");
  }
  return redirect("/home");
}
