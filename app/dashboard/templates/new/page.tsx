"use client";

import { useState } from "react";

type Field = {
  id: number;
  label: string;
  type: string;
};

export default function NewTemplatePage() {
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);

  function addField(type: string) {
    setFields([
      ...fields,
      {
        id: Date.now(),
        label: "",
        type,
      },
    ]);
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-zinc-900">
        Create Template
      </h1>

      <p className="mt-2 text-zinc-600">
        Build your onboarding form.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <label className="mb-2 block font-medium">
          Template Name
        </label>

        <input
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="SEO Client Onboarding"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Add Fields
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => addField("Text")}
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            + Text
          </button>

          <button
            onClick={() => addField("Textarea")}
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            + Textarea
          </button>

          <button
            onClick={() => addField("File")}
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            + File Upload
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="rounded-xl border border-zinc-200 p-4"
            >
              <p className="text-sm text-zinc-500">
                {field.type}
              </p>

              <input
                placeholder="Field label"
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}