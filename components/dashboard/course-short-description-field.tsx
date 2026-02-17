import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ShortDescriptionFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function ShortDescriptionField({
  value,
  error,
  onChange,
}: ShortDescriptionFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="shortDescription">
        Deskripsi Singkat <span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="shortDescription"
        placeholder="Ringkasan singkat tentang kursus ini (max 200 karakter)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
        rows={3}
      />
      <p className="text-xs text-slate-500">{value.length}/200 karakter</p>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
