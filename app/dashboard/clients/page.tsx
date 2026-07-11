"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  getClients,
  createClient,
  deleteClient,
} from "@/lib/clients";

type Client = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const data = await getClients(user.id);

    setClients(data);
    setLoading(false);
  }

  async function handleCreate() {
    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await createClient(user.id, name, email, company);

    setName("");
    setEmail("");
    setCompany("");

    loadClients();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this client?")) return;

    await deleteClient(id);

    loadClients();
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold">
        Clients
      </h1>

      <p className="mt-2 text-zinc-600">
        Manage your agency clients.
      </p>

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border px-4 py-3 text-zinc-900"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border px-4 py-3 text-zinc-900"
          />

          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="rounded-lg border px-4 py-3 text-zinc-900"
          />
        </div>

        <button
          onClick={handleCreate}
          className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white"
        >
          Add Client
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : clients.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            No clients yet.
          </div>
        ) : (
          clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between rounded-xl border bg-white p-5"
            >
              <div>
                <h2 className="font-semibold">
                  {client.name}
                </h2>

                <p className="text-sm text-zinc-500">
                  {client.email}
                </p>

                <p className="text-sm text-zinc-500">
                  {client.company}
                </p>

                <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  {client.status}
                </span>
              </div>

              <button
                onClick={() => handleDelete(client.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}