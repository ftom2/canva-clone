import { useEffect, useState } from "react";
import { ActiveTool, IEditor } from "../types";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { ToolbarItem } from "./sidebar/ToolbarItem";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ToolbarProps {
  editor?: IEditor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (!editor?.selectedObjects.length) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-40 p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-40 p-2 gap-x-2">
      <div className="flex items-center justify-center h-full">
        <ToolbarItem
          activeTool={activeTool}
          onClick={onChangeActiveTool}
          style={{ backgroundColor: fillColor }}
          type="fill"
          label="color"
        />
        <ToolbarItem
          activeTool={activeTool}
          onClick={onChangeActiveTool}
          style={{ borderColor: strokeColor }}
          type="stroke-color"
          label="stroke color"
        />

        <ToolbarItem
          activeTool={activeTool}
          onClick={onChangeActiveTool}
          type="stroke-width"
          label="stroke width"
        >
          <BsBorderWidth className="size-4" />
        </ToolbarItem>
        <ToolbarItem
          onClick={() => editor?.bringForward()}
          label="bring forward"
        >
          <ArrowUp className="size-4" />
        </ToolbarItem>
        <ToolbarItem onClick={() => editor?.sendBackwards()} label="send back">
          <ArrowDown className="size-4" />
        </ToolbarItem>
      </div>
    </div>
  );
}
