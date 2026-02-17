import { Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface BenefitSectionProps {
  values: { benefits: string[] };
  addArrayItem: (field: "benefits") => void;
  removeArrayItem: (field: "benefits", index: number) => void;
  updateArrayField: (field: "benefits", index: number, value: string) => void;
}

const BenefitSection = ({
  values,
  addArrayItem,
  removeArrayItem,
  updateArrayField,
}: BenefitSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manfaat / Benefit</CardTitle>
        <CardDescription>
          Yang akan didapatkan peserta setelah mengikuti program
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {values.benefits.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) =>
                updateArrayField("benefits", index, e.target.value)
              }
              placeholder={`Benefit ${index + 1}`}
            />
            {values.benefits.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => removeArrayItem("benefits", index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => addArrayItem("benefits")}
        >
          <Plus className="h-4 w-4" />
          Tambah Benefit
        </Button>
      </CardContent>
    </Card>
  );
};

export default BenefitSection;
