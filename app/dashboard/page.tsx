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
    <>
      <h1 className="text-4xl font-bold text-zinc-900">
        Welcome back 👋
      </h1>

      <p className="mt-2 text-zinc-600">
        This is your agency dashboard.
      </p>
    </>
  );
}