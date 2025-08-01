import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getUserPermission } from "../server";
import ClientButtons from "./ClientButtons";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const user = await getUserPermission();

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Error: Could not retrieve user roles or permissions.
      </div>
    );
  }

  return (
  <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 grid grid-rows-[auto_1fr_auto] gap-16">
    
    {/* Top bar with Logout button aligned right */}
    <div className="flex justify-end">
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>

    {/* Main content */}
    <main className="flex flex-row gap-8 items-start justify-center row-start-2">
      <ClientButtons roles={user.role} />
    </main>

  </div>
);

}
