import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOptions } from "@/lib/courses-data";

export interface CategoryFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function CategoryField({
  value,
  error,
  onChange,
}: CategoryFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        Kategori <span className="text-red-500">*</span>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder="Pilih kategori" />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
