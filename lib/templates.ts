import { supabase } from "./supabase";

export async function createTemplate(name: string, userId: string) {
  const { data, error } = await supabase
    .from("templates")
    .insert({
      name,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function createTemplateFields(
  templateId: string,
  userId: string,
  fields: {
    label: string;
    type: string;
  }[]
) {
  const { error } = await supabase.from("template_fields").insert(
    fields.map((field, index) => ({
      template_id: templateId,
      label: field.label,
      field_type: field.type,
      field_order: index,
      user_id: userId,
    }))
  );

  if (error) throw error;
}

export async function getTemplate(id: string) {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getTemplateFields(id: string) {
  const { data, error } = await supabase
    .from("template_fields")
    .select("*")
    .eq("template_id", id)
    .order("field_order");

  if (error) throw error;

  return data;
}