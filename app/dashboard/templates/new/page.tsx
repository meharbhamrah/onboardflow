"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import {
  createTemplate,
  createTemplateFields,
} from "@/lib/templates";

import FieldTypes from "@/components/templates/FieldTypes";
import FieldCard from "@/components/templates/FieldCard";

import {
  FieldType,
  TemplateField,
} from "@/types/template";

export default function NewTemplatePage() {
  const router = useRouter();

  const [templateName, setTemplateName] = useState("");

  const [fields, setFields] = useState<
    TemplateField[]
  >([]);

  const [loading, setLoading] = useState(false);

  function addField(type: FieldType) {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: "",
        type,
        required: false,
        placeholder: "",
      },
    ]);
  }

  function updateField(
    id: number,
    updates: Partial<TemplateField>
  ) {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, ...updates }
          : field
      )
    );
  }

  function removeField(id: number) {
    setFields((prev) =>
      prev.filter((field) => field.id !== id)
    );
  }

  async function save() {
    if (!templateName.trim()) {
      alert("Template name required.");
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

      router.push("/dashboard/templates");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Create Template
        </h1>

        <p className="mt-2 text-zinc-600">
          Build a reusable onboarding template.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">

        <label className="mb-2 block font-medium">
          Template Name
        </label>

        <input
          value={templateName}
          onChange={(e) =>
            setTemplateName(e.target.value)
          }
          placeholder="SEO Client Onboarding"
          className="w-full rounded-lg border px-4 py-3 text-zinc-900"
        />
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6">

        <h2 className="text-xl font-semibold">
          Add Fields
        </h2>

        <div className="mt-6">
          <FieldTypes onSelect={addField} />
        </div>

        <div className="mt-8 space-y-4">

          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              onLabelChange={(value) =>
                updateField(field.id, {
                  label: value,
                })
              }
              onRequiredChange={(value) =>
                updateField(field.id, {
                  required: value,
                })
              }
              onDelete={() =>
                removeField(field.id)
              }
            />
          ))}

          {fields.length === 0 && (
            <div className="rounded-lg border border-dashed p-10 text-center text-zinc-500">
              No fields added yet.
            </div>
          )}
        </div>

        <button
          onClick={save}
          disabled={loading}
          className="mt-8 rounded-lg bg-black px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Template"}
        </button>
      </div>
    </div>
  );
}