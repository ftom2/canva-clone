import { ActiveTool, IEditor } from "../types";

import { BsBorderWidth } from "react-icons/bs";
import { ToolbarItem } from "./sidebar/ToolbarItem";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";

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
  const selectedFont = editor?.getActiveFontFamily();

  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);

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
        {!isText && (
          <>
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
          </>
        )}
        {isText && (
          <ToolbarItem
            activeTool={activeTool}
            onClick={onChangeActiveTool}
            type="font"
            label="font"
            className="p-2 w-auto justify-start text-left"
          >
            <div className="max-w-[100px] truncate shrink-0">
              {selectedFont}
            </div>
            <ChevronDown className="size-4 shrink-0" />
          </ToolbarItem>
        )}
        <ToolbarItem
          onClick={() => editor?.bringForward()}
          label="bring forward"
        >
          <ArrowUp className="size-4" />
        </ToolbarItem>
        <ToolbarItem onClick={() => editor?.sendBackwards()} label="send back">
          <ArrowDown className="size-4" />
        </ToolbarItem>
        <ToolbarItem
          activeTool={activeTool}
          onClick={onChangeActiveTool}
          label="opacity"
          type="opacity"
        >
          <RxTransparencyGrid className="size-4" />
        </ToolbarItem>
      </div>
    </div>
  );
}
