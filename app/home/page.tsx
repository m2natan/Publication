import { getUserPermission } from "../server";
import ClientButtons from "./ClientButtons";

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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
        <ClientButtons roles={user.role} />
      </main>
    </div>
  );
}
