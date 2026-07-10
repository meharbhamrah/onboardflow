import Link from "next/link";

export default function TemplatesPage() {
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
          className="rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-zinc-800"
        >
          + New Template
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900">
          No templates yet
        </h2>

        <p className="mt-3 text-zinc-600">
          Create your first onboarding template to start inviting clients.
        </p>
      </div>
    </div>
  );
}