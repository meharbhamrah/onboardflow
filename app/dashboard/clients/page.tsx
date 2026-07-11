"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  getClients,
  createClient,
  deleteClient,
} from "@/lib/clients";
import { assignTemplate } from "@/lib/onboardings";

type Client = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
};

type Template = {
  id: string;
  name: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const clientsData = await getClients(user.id);

    const { data: templatesData, error } = await supabase
      .from("templates")
      .select("id, name")
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
    }

    setClients(clientsData || []);
    setTemplates(templatesData || []);
    setLoading(false);
  }

  async function handleCreate() {
    if (!name || !email) {
      alert("Name and Email are required.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      await createClient(user.id, name, email, company);

      setName("");
      setEmail("");
      setCompany("");

      loadData();
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  }

  async function handleAssign(clientId: string) {
    if (!selectedTemplate) {
      alert("Please select a template.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      const onboarding = await assignTemplate(
        user.id,
        clientId,
        selectedTemplate
      );

      alert(
        `Template assigned successfully!\n\nClient Link:\n${window.location.origin}/onboard/${onboarding.token}`
      );
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  }

  async function handleDelete(id: string) {
    const confirmed = confirm("Delete this client?");

    if (!confirmed) return;

    try {
      await deleteClient(id);
      loadData();
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold">Clients</h1>

      <p className="mt-2 text-zinc-600">
        Manage your agency clients.
      </p>

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
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
          className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-zinc-800"
        >
          Add Client
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : clients.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            No clients yet.
          </div>
        ) : (
          clients.map((client) => (
            <div
              key={client.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {client.name}
                  </h2>

                  <p className="text-zinc-600">{client.email}</p>

                  <p className="text-zinc-600">{client.company}</p>

                  <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    {client.status}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <select
                    value={selectedTemplate}
                    onChange={(e) =>
                      setSelectedTemplate(e.target.value)
                    }
                    className="rounded-lg border px-4 py-2 text-zinc-900"
                  >
                    <option value="">Select Template</option>

                    {templates.map((template) => (
                      <option
                        key={template.id}
                        value={template.id}
                      >
                        {template.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleAssign(client.id)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Assign Template
                  </button>

                  <button
                    onClick={() => handleDelete(client.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}