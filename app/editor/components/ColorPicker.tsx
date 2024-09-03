import { ChromePicker, CirclePicker, ColorResult } from "react-color";
import { COLORS } from "../constants";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  function onChangeComplete(color: ColorResult) {
    const formattedValue = rgbaObjectToString(color.rgb);
    onChange(formattedValue);
  }

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={onChangeComplete}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={COLORS}
        onChangeComplete={onChangeComplete}
      />
    </div>
  );
};
