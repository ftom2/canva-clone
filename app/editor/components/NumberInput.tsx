import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export const NumberInput = ({
  value,
  onChange,
  min = 1,
  max = Infinity,
  step = 1,
}: NumberInputProps) => {
  const handleIncrement = () => {
    if (!max || value < max) {
      onChange(Math.min(max ?? Infinity, value + step));
    }
  };

  const handleDecrement = () => {
    if (!min || value > min) {
      onChange(Math.max(min ?? -Infinity, value - step));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      if ((!min || newValue >= min) && (!max || newValue <= max)) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        className="rounded-l-sm rounded-r-none border-r-0"
      >
        -
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="w-20 text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-none focus-visible:outline-none focus-visible:ring-0 "
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        className="rounded-r-sm rounded-l-none border-l-0"
      >
        +
      </Button>
    </div>
  );
};
