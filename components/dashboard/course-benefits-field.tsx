import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Plus } from "lucide-react";

export interface CourseBenefitsFieldProps {
  benefits?: string[];
  onChange: (benefits: string[]) => void;
}

export default function CourseBenefitsField({
  benefits,
  onChange,
}: CourseBenefitsFieldProps) {
  const values = benefits && benefits.length > 0 ? benefits : [""];

  const handleChange = (index: number, value: string) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };

  const handleAdd = () => {
    onChange([...values, ""]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>
              <Label className="text-base font-semibold">Manfaat Kursus</Label>
            </span>
          </span>
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Manfaat
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {values.map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <Input
              name={`benefits[${index}]`}
              placeholder={`Manfaat ${index + 1}`}
              value={benefit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
