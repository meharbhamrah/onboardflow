"use client";

import { TemplateField } from "@/types/template";

type Props = {
  field: TemplateField;
  onLabelChange(value: string): void;
  onRequiredChange(value: boolean): void;
  onDelete(): void;
};

export default function FieldCard({
  field,
  onLabelChange,
  onRequiredChange,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium capitalize">
            {field.type}
          </p>

          <p className="text-sm text-zinc-500">
            Field Type
          </p>
        </div>

        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      </div>

      <input
        value={field.label}
        onChange={(e) =>
          onLabelChange(e.target.value)
        }
        placeholder="Field Label"
        className="mt-5 w-full rounded-lg border px-4 py-3 text-zinc-900"
      />

      <label className="mt-5 flex items-center gap-3">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) =>
            onRequiredChange(e.target.checked)
          }
        />

        <span>Required</span>
      </label>
    </div>
  );
}