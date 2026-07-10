"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Template = {
  id: string;
  name: string;
  created_at: string;
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplates() {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setTemplates(data);
      }

      setLoading(false);
    }

    loadTemplates();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900">
            Templates
          </h1>

          <p className="mt-2 text-zinc-600">
            Create reusable onboarding templates for your clients.
          </p>
        </div>

        <Link
          href="/dashboard/templates/new"
          className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-zinc-800"
        >
          + New Template
        </Link>
      </div>

      <div className="mt-10">
        {loading ? (
          <p className="text-zinc-500">Loading...</p>
        ) : templates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-semibold text-zinc-900">
              No templates yet
            </h2>

            <p className="mt-3 text-zinc-600">
              Create your first onboarding template to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-zinc-900">
                  {template.name}
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Created{" "}
                  {new Date(template.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}