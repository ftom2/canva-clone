import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { ActiveTool } from "../../types";
import { cn } from "@/lib/utils";
import { StyleHTMLAttributes } from "react";

type Props = {
  onClick: (tool: ActiveTool) => void;
  type?: ActiveTool;
  activeTool?: ActiveTool;
  style?: any;
  children?: React.ReactNode;
  label: string;
  className?: string;
};
export function ToolbarItem({
  type,
  activeTool,
  style,
  label,
  children,
  className,
  onClick,
}: Props) {
  return (
    <Hint label={label} side="bottom" sideOffset={5}>
      <Button
        onClick={() => onClick(type!)}
        size="icon"
        variant="ghost"
        className={cn(type && activeTool === type && "bg-gray-100", className)}
      >
        {children ? (
          children
        ) : (
          <div className="rounded-sm size-4 border" style={style} />
        )}
      </Button>
    </Hint>
  );
}
