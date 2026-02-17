import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface TitleFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function TitleField({ value, error, onChange }: TitleFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">
        Judul Kursus <span className="text-red-500">*</span>
      </Label>
      <Input
        id="title"
        placeholder="Contoh: Pengantar Hukum Pidana Indonesia"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
