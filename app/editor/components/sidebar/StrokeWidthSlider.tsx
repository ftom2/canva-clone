import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface StrokeWidthSlider {
  label: string;
  strokeWidth: number;
  onChangeStrokeWidth: (value: number[]) => void;
}
export function StrokeWidthSlider({
  label,
  strokeWidth,
  onChangeStrokeWidth,
}: StrokeWidthSlider) {
  return (
    <div className="p-4 space-y-4 border-b">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <Label>{strokeWidth}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Label>1</Label>
        <Slider
          max={50}
          step={1}
          onValueChange={onChangeStrokeWidth}
          value={[strokeWidth]}
          className="flex-1"
        />
        <Label>50</Label>
      </div>
    </div>
  );
}
