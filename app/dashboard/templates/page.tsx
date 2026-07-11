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
    loadTemplates();
  }, []);

  async function loadTemplates() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTemplates(data);
    }

    setLoading(false);
  }

  async function deleteTemplate(id: string) {
    const confirmed = window.confirm(
      "Delete this template permanently?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("templates")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900">
            Templates
          </h1>

          <p className="mt-2 text-zinc-600">
            Manage your onboarding templates.
          </p>
        </div>

        <Link
          href="/dashboard/templates/new"
          className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-zinc-800"
        >
          + New Template
        </Link>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : templates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <h2 className="text-2xl font-semibold">
            No templates yet
          </h2>

          <p className="mt-3 text-zinc-600">
            Create your first onboarding template.
          </p>

          <Link
            href="/dashboard/templates/new"
            className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white"
          >
            Create Template
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>

                <Link
                    href={`/dashboard/templates/${template.id}`}
                    className="text-xl font-semibold text-zinc-900 hover:underline"
                  >
                    {template.name}
                </Link>

                  <p className="mt-2 text-sm text-zinc-500">
                    Created{" "}
                    {new Date(
                      template.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}