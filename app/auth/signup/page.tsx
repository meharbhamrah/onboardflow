"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully! You can now log in.");

    setEmail("");
    setPassword("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-zinc-900">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">
          Create your account
        </h1>

        <p className="mt-2 text-zinc-600">
          Start using OnboardFlow today.
        </p>

        <form onSubmit={handleSignUp} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 caret-black outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 caret-black outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}