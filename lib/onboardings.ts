import { supabase } from "./supabase";

export async function assignTemplate(
  userId: string,
  clientId: string,
  templateId: string
) {
  const { data, error } = await supabase
    .from("client_onboardings")
    .insert({
      user_id: userId,
      client_id: clientId,
      template_id: templateId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}