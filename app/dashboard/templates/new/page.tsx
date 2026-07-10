"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  createTemplate,
  createTemplateFields,
} from "@/lib/templates";

type Field = {
  id: number;
  label: string;
  type: string;
};

export default function NewTemplatePage() {
  const router = useRouter();

  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);

  function addField(type: string) {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: "",
        type,
      },
    ]);
  }

  function updateField(id: number, value: string) {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, label: value }
          : field
      )
    );
  }

  function removeField(id: number) {
    setFields((prev) =>
      prev.filter((field) => field.id !== id)
    );
  }

  async function saveTemplate() {
    if (!templateName.trim()) {
      alert("Please enter a template name.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not logged in");

      const template = await createTemplate(
        templateName,
        user.id
      );

      await createTemplateFields(
        template.id,
        user.id,
        fields
      );

      alert("Template saved successfully!");

      router.push("/dashboard/templates");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold">
        Create Template
      </h1>

      <p className="mt-2 text-zinc-600">
        Build your onboarding template.
      </p>

      <div className="mt-8 rounded-2xl border bg-white p-8">
        <label className="mb-2 block font-medium">
          Template Name
        </label>

        <input
          value={templateName}
          onChange={(e) =>
            setTemplateName(e.target.value)
          }
          className="w-full rounded-lg border px-4 py-3 text-zinc-900"
          placeholder="SEO Client Onboarding"
        />
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-8">
        <h2 className="text-2xl font-semibold">
          Fields
        </h2>

        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={() => addField("Text")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            + Text
          </button>

          <button
            onClick={() => addField("Textarea")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            + Textarea
          </button>

          <button
            onClick={() => addField("File")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            + File
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="rounded-xl border p-4"
            >
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">
                  {field.type}
                </span>

                <button
                  onClick={() =>
                    removeField(field.id)
                  }
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>

              <input
                value={field.label}
                onChange={(e) =>
                  updateField(
                    field.id,
                    e.target.value
                  )
                }
                className="mt-3 w-full rounded-lg border px-4 py-3 text-zinc-900"
                placeholder="Field label"
              />
            </div>
          ))}
        </div>

        <button
          onClick={saveTemplate}
          disabled={loading}
          className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Template"}
        </button>
      </div>
    </div>
  );
}