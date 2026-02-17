import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

export interface PriceFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function PriceField({
  value,
  error,
  onChange,
}: PriceFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">
        Harga Kredit Pelatihan <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Clock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          name="credit_price"
          id="credit_price"
          placeholder="Contoh: 50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-9 ${error ? "border-red-500" : ""}`}
          type="number"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
