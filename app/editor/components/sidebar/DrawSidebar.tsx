import { cn } from "@/lib/utils";
import { SidebarProps } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./ToolSidebarClose";
import { ColorPicker } from "../ColorPicker";
import { STROKE_COLOR, STROKE_WIDTH } from "@/app/editor/constants";
import { useCallback, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { StrokeWidthSlider } from "./StrokeWidthSlider";

export const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const strokeColor = useMemo(
    () => editor?.getActiveStrokeColor() ?? STROKE_COLOR,
    [editor]
  );
  const strokeWidth = useMemo(
    () => editor?.getActiveStrokeWidth() ?? STROKE_WIDTH,
    [editor]
  );

  const onClose = useCallback(() => {
    editor?.disableDrawingMode();
    onChangeActiveTool("select");
  }, [onChangeActiveTool, editor]);

  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onChangeStrokeWidth = (value: number[]) => {
    editor?.changeStrokeWidth(value[0]);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Draw" description="Modify brush settings" />
      <ScrollArea>
        <StrokeWidthSlider
          label="Brush Width"
          strokeWidth={strokeWidth}
          onChangeStrokeWidth={onChangeStrokeWidth}
        />
        <div className="p-4 space-y-6">
          <ColorPicker onChange={onChange} value={strokeColor} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
