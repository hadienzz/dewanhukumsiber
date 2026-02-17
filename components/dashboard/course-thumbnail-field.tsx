import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon } from "lucide-react";

export interface ThumbnailFieldProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export default function ThumbnailField({ value, onChange }: ThumbnailFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="thumbnail">Thumbnail Kursus</Label>
      <div className="relative">
        <ImageIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          className="pl-9"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            onChange(file);
          }}
        />
      </div>
      {value && (
        <p className="text-xs text-slate-500">File dipilih: {value.name}</p>
      )}
    </div>
  );
}
