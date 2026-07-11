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

    if (!user) return;

    const clientsData = await getClients(user.id);

    const { data: templatesData } = await supabase
      .from("templates")
      .select("id, name")
      .eq("user_id", user.id);

    setClients(clientsData);
    setTemplates(templatesData || []);
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

    loadData();
  }

  async function handleAssign(clientId: string) {
    if (!selectedTemplate) {
      alert("Select a template first.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await assignTemplate(user.id, clientId, selectedTemplate);

    alert("Template assigned successfully!");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this client?")) return;

    await deleteClient(id);

    loadData();
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold">Clients</h1>

      <div className="mt-8 rounded-xl border bg-white p-6">
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
          className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
        >
          Add Client
        </button>
      </div>

      <div className="mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="rounded-xl border bg-white p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {client.name}
                    </h2>

                    <p>{client.email}</p>

                    <p>{client.company}</p>

                    <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
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
                      <option value="">
                        Select Template
                      </option>

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
                      onClick={() =>
                        handleAssign(client.id)
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                      Assign Template
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(client.id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}