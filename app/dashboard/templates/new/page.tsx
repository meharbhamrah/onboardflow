"use client";

import { useState } from "react";

export default function NewTemplatePage() {
  const [templateName, setTemplateName] = useState("");

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-zinc-900">
        Create Template
      </h1>

      <p className="mt-2 text-zinc-600">
        Start by giving your onboarding template a name.
      </p>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <label
          htmlFor="templateName"
          className="mb-2 block text-sm font-medium text-zinc-700"
        >
          Template Name
        </label>

        <input
          id="templateName"
          type="text"
          placeholder="e.g. SEO Client Onboarding"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-black"
        />

        <button
          type="button"
          className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}