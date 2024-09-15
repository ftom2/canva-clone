import { cn } from "@/lib/utils";
import { SidebarProps } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./ToolSidebarClose";

import { STROKE_WIDTH } from "../../constants";
import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { StrokeWidthSlider } from "./StrokeWidthSlider";

export const StrokeSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const strokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  const onChangeStrokeWidth = (value: number[]) => {
    editor?.changeStrokeWidth(value[0]);
  };

  const onStrokeDashArrayChange = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Options"
        description="Change the stroke width of the selected object"
      />
      <ScrollArea>
        <StrokeWidthSlider
          label="Stroke Width"
          strokeWidth={strokeWidth}
          onChangeStrokeWidth={onChangeStrokeWidth}
        />
        <div className="p-4 space-y-4 border-b">
          <div className="flex justify-between">
            <Label>Stroke Type</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              className={cn(
                "w-full bg-gray-100 flex items-center",
                editor?.getActiveStrokeDashArray().length === 0 &&
                  "border-2 border-blue-500"
              )}
              variant="ghost"
              onClick={() => onStrokeDashArrayChange([])}
            >
              <div className="border-t-4 border-black w-full" />
            </Button>
            <Button
              className={cn(
                "w-full bg-gray-100 flex items-center",
                editor?.getActiveStrokeDashArray().length === 2 &&
                  "border-2 border-blue-500"
              )}
              variant="ghost"
              onClick={() => onStrokeDashArrayChange([5, 5])}
            >
              <div className="border-t-4 border-dashed border-black w-full" />
            </Button>
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
