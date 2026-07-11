"use client";

import { useEffect, useState } from "react";
import {
  getTemplate,
  getTemplateFields,
} from "@/lib/templates";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Field = {
  id: string;
  label: string;
  field_type: string;
  required: boolean;
  placeholder: string | null;
};

export default function TemplatePage({
  params,
}: Props) {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { id } = await params;

      const template = await getTemplate(id);
      const templateFields = await getTemplateFields(id);

      setName(template.name);
      setFields(templateFields);
      setLoading(false);
    }

    load();
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{name}</h1>

        <p className="mt-2 text-zinc-600">
          Template Structure
        </p>
      </div>

      <div className="space-y-4">
        {fields.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-zinc-500">
            No fields found.
          </div>
        ) : (
          fields.map((field) => (
            <div
              key={field.id}
              className="rounded-xl border bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    {field.label || "Untitled Field"}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500 capitalize">
                    {field.field_type}
                  </p>

                  {field.placeholder && (
                    <p className="mt-1 text-sm text-zinc-400">
                      Placeholder: {field.placeholder}
                    </p>
                  )}
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    field.required
                      ? "bg-red-100 text-red-700"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {field.required
                    ? "Required"
                    : "Optional"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}