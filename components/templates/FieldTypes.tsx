import { FieldType } from "@/types/template";

const fieldTypes: {
  label: string;
  value: FieldType;
}[] = [
  { label: "Text", value: "text" },
  { label: "Textarea", value: "textarea" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "URL", value: "url" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "File Upload", value: "file" },
];

type Props = {
  onSelect(type: FieldType): void;
};

export default function FieldTypes({
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {fieldTypes.map((field) => (
        <button
          key={field.value}
          onClick={() => onSelect(field.value)}
          className="rounded-lg border bg-white p-4 text-left transition hover:border-black hover:bg-zinc-50"
        >
          <p className="font-medium">{field.label}</p>
        </button>
      ))}
    </div>
  );
}