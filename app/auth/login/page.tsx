"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">
          Welcome back
        </h1>

        <p className="mt-2 text-zinc-600">
          Log in to your OnboardFlow account.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-black"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-black"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-zinc-800"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}