"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/login");
      }
    }

    checkUser();
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-zinc-50 p-10">
        <h1 className="text-4xl font-bold text-zinc-900">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-zinc-600">
          This is your agency dashboard.
        </p>
      </main>
    </div>
  );
}