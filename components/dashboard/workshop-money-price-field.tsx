import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";

export interface MoneyPriceFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function MoneyPriceField({
  value,
  error,
  onChange,
}: MoneyPriceFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">
        Harga Uang (IDR) <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <CreditCard className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          name="price"
          id="price"
          placeholder="Contoh: 300000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-9 ${error ? "border-red-500" : ""}`}
          type="number"
          min={1}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
