"use client";

import { useEffect, useState } from "react";
import { getTemplate, getTemplateFields } from "@/lib/templates";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function TemplatePage({ params }: Props) {
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { id } = await params;

      const template = await getTemplate(id);
      const templateFields = await getTemplateFields(id);

      setTemplateName(template.name);
      setFields(templateFields);
    }

    load();
  }, [params]);

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold">
        {templateName}
      </h1>

      <p className="mt-2 text-zinc-600">
        Template Preview
      </p>

      <div className="mt-10 space-y-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className="rounded-xl border bg-white p-5"
          >
            <p className="font-semibold">
              {field.label}
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              {field.field_type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}