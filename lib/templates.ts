import { supabase } from "./supabase";
import { TemplateField } from "@/types/template";

export async function createTemplate(
  name: string,
  userId: string
) {
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
  fields: TemplateField[]
) {
  if (fields.length === 0) return;

  const { error } = await supabase.from("template_fields").insert(
    fields.map((field, index) => ({
      template_id: templateId,
      user_id: userId,
      label: field.label,
      field_type: field.type,
      required: field.required,
      placeholder: field.placeholder ?? "",
      field_order: index,
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