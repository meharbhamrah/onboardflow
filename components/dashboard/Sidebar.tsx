import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white p-6">
      <h1 className="mb-10 text-2xl font-bold text-zinc-900">
        OnboardFlow
      </h1>

      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className="rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/clients"
          className="rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Clients
        </Link>

        <Link
          href="/dashboard/templates"
          className="rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Templates
        </Link>

        <Link
          href="/dashboard/settings"
          className="rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}