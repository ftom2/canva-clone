import { SidebarProps } from "@/app/editor/types";

import { BsBorderWidth } from "react-icons/bs";
import { ToolbarItem } from "./ToolbarItem";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../../utils";

import { useMemo } from "react";
import { ToolbarTextItems } from "./ToolbarTextItems";

export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  if (!editor?.selectedObjects.length) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-40 p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-40 p-2 gap-x-2">
      <div className="flex items-center justify-center h-full">
        {!isImage && (
          <ToolbarItem
            activeTool={activeTool}
            onClick={onChangeActiveTool}
            style={{ backgroundColor: fillColor }}
            type="fill"
            label="color"
          />
        )}
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
          <ToolbarTextItems
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
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
        <ToolbarItem onClick={() => editor?.delete()} label="delete">
          <Trash className="size-4 text-red-500" />
        </ToolbarItem>
      </div>
    </div>
  );
}
