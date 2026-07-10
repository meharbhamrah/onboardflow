"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>
    </main>
  );
}