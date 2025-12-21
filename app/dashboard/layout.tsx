import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Client-side subscription refresh on key moments (portal return, checkout return, login) */}
      {children}
      {/* <EnsureUserProfile>
        <main className="pt-16">
          {children}
        </main>
      </EnsureUserProfile> */}
    </div>
  );
}
