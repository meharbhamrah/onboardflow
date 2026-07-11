export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "url"
  | "number"
  | "date"
  | "file";

export interface TemplateField {
  id: number;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
}

export interface Template {
  id: string;
  name: string;
}