import { supabase } from "./supabase";

export async function getClients(userId: string) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createClient(
  userId: string,
  name: string,
  email: string,
  company: string
) {
  const { error } = await supabase.from("clients").insert({
    user_id: userId,
    name,
    email,
    company,
  });

  if (error) throw error;
}

export async function deleteClient(id: string) {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id);

  if (error) throw error;
}